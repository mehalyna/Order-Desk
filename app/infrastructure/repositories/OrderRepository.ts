import { Db } from "mongodb";
import { Order } from "@/app/lib/types";

export class OrderRepository {
  constructor(private db: Db) {}

  async findAll(): Promise<Order[]> {
    const orders = await this.db
      .collection("orders")
      .find()
      .sort({ createdAt: -1 })
      .toArray();

    return orders.map(this.mapToOrder);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.db.collection("orders").findOne({ id });
    return order ? this.mapToOrder(order) : null;
  }

  async findByCustomerId(customerId: string): Promise<Order[]> {
    const orders = await this.db
      .collection("orders")
      .find({ customerId })
      .sort({ createdAt: -1 })
      .toArray();

    return orders.map(this.mapToOrder);
  }

  async update(id: string, updates: Partial<Order>): Promise<Order | null> {
    const result = await this.db.collection("orders").findOneAndUpdate(
      { id },
      { $set: { ...updates, updatedAt: new Date() } },
      { returnDocument: "after" }
    );

    return result ? this.mapToOrder(result) : null;
  }

  async create(order: Order): Promise<Order> {
    await this.db.collection("orders").insertOne(order);
    return order;
  }

  private mapToOrder(doc: any): Order {
    return {
      id: doc.id,
      customerId: doc.customerId,
      customerName: doc.customerName,
      items: doc.items,
      status: doc.status,
      total: doc.total,
      discount: doc.discount,
      managerNote: doc.managerNote,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt
    };
  }
}
