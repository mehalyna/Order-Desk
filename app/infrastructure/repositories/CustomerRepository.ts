import { Db } from "mongodb";
import { Customer } from "@/app/lib/types";

export class CustomerRepository {
  constructor(private db: Db) {}

  async findAll(): Promise<Customer[]> {
    const customers = await this.db
      .collection("customers")
      .find()
      .sort({ name: 1 })
      .toArray();

    return customers.map(this.mapToCustomer);
  }

  async findById(id: string): Promise<Customer | null> {
    const customer = await this.db.collection("customers").findOne({ id });
    return customer ? this.mapToCustomer(customer) : null;
  }

  private mapToCustomer(doc: any): Customer {
    return {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      address: doc.address,
      createdAt: doc.createdAt
    };
  }
}
