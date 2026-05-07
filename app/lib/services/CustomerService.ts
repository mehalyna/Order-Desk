import { Customer } from "@/app/lib/types";
import { CustomerRepository } from "@/app/infrastructure/repositories/CustomerRepository";
import { OrderRepository } from "@/app/infrastructure/repositories/OrderRepository";

export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private orderRepository: OrderRepository
  ) {}

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.findAll();
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    return this.customerRepository.findById(id);
  }

  async getCustomerStats(id: string): Promise<{
    orderCount: number;
    totalSpent: number;
  }> {
    const orders = await this.orderRepository.findByCustomerId(id);

    return {
      orderCount: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
    };
  }
}
