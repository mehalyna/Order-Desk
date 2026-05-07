import { Db } from "mongodb";
import { OrderRepository } from "@/app/infrastructure/repositories/OrderRepository";
import { CustomerRepository } from "@/app/infrastructure/repositories/CustomerRepository";
import { ProductRepository } from "@/app/infrastructure/repositories/ProductRepository";
import { OrderService } from "@/app/lib/services/OrderService";
import { CustomerService } from "@/app/lib/services/CustomerService";
import { ProductService } from "@/app/lib/services/ProductService";

export function createServices(db: Db) {
  // Create repositories
  const orderRepository = new OrderRepository(db);
  const customerRepository = new CustomerRepository(db);
  const productRepository = new ProductRepository(db);

  // Create services
  const orderService = new OrderService(orderRepository, productRepository);
  const customerService = new CustomerService(customerRepository, orderRepository);
  const productService = new ProductService(productRepository);

  return {
    orderRepository,
    customerRepository,
    productRepository,
    orderService,
    customerService,
    productService
  };
}
