import { Product } from "@/app/lib/types";
import { ProductRepository } from "@/app/infrastructure/repositories/ProductRepository";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findById(id);
  }
}
