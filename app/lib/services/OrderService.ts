import { Order, OrderStatus } from "@/app/lib/types";
import { OrderRepository } from "@/app/infrastructure/repositories/OrderRepository";
import { ProductRepository } from "@/app/infrastructure/repositories/ProductRepository";
import { UpdateOrderSchema } from "@/app/lib/validation/schemas";

export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
    private productRepository: ProductRepository
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }

  async getOrderById(id: string): Promise<Order | null> {
    return this.orderRepository.findById(id);
  }

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return this.orderRepository.findByCustomerId(customerId);
  }

  async updateOrder(
    id: string,
    updates: { status: OrderStatus; discount: number; managerNote?: string }
  ): Promise<{ success: boolean; error?: string; order?: Order }> {
    // Validate input
    const validation = UpdateOrderSchema.safeParse(updates);
    if (!validation.success) {
      return {
        success: false,
        error: validation.error.issues[0].message
      };
    }

    // Get current order
    const order = await this.orderRepository.findById(id);
    if (!order) {
      return { success: false, error: "Order not found" };
    }

    // Business Rule 1: Cannot confirm order if any item has zero stock
    if (updates.status === "Confirmed" && order.status === "New") {
      const productIds = order.items.map((item) => item.productId);
      const products = await this.productRepository.findByIds(productIds);

      const outOfStockItems = products.filter((p) => !p.inStock);
      if (outOfStockItems.length > 0) {
        return {
          success: false,
          error: `Cannot confirm order: ${outOfStockItems.map((p) => p.name).join(", ")} out of stock`
        };
      }
    }

    // Business Rule 2: Cannot cancel order once it has reached Shipped
    if (updates.status === "Cancelled") {
      if (order.status === "Shipped" || order.status === "Delivered") {
        return {
          success: false,
          error: "Cannot cancel an order that has been shipped"
        };
      }
    }

    // Business Rule 3: Empty order check
    if (order.items.length === 0) {
      return {
        success: false,
        error: "Cannot save an order with no items"
      };
    }

    // Business Rule 4: Recalculate total
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const total = subtotal * (1 - updates.discount / 100);

    // Update order
    const updatedOrder = await this.orderRepository.update(id, {
      status: updates.status,
      discount: updates.discount,
      managerNote: updates.managerNote,
      total
    });

    return { success: true, order: updatedOrder! };
  }

  async calculateTotal(items: Order["items"], discount: number): Promise<number> {
    const subtotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return subtotal * (1 - discount / 100);
  }
}
