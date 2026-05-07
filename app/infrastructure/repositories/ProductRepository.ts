import { Db } from "mongodb";
import { Product } from "@/app/lib/types";

export class ProductRepository {
  constructor(private db: Db) {}

  async findAll(): Promise<Product[]> {
    const products = await this.db
      .collection("products")
      .find()
      .sort({ name: 1 })
      .toArray();

    return products.map(this.mapToProduct);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.db.collection("products").findOne({ id });
    return product ? this.mapToProduct(product) : null;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    const products = await this.db
      .collection("products")
      .find({ id: { $in: ids } })
      .toArray();

    return products.map(this.mapToProduct);
  }

  private mapToProduct(doc: any): Product {
    return {
      id: doc.id,
      name: doc.name,
      price: doc.price,
      inStock: doc.inStock
    };
  }
}
