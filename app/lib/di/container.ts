import { createContainer, asClass, InjectionMode } from "awilix";
import { Db } from "mongodb";
import { OrderRepository } from "@/app/infrastructure/repositories/OrderRepository";
import { CustomerRepository } from "@/app/infrastructure/repositories/CustomerRepository";
import { ProductRepository } from "@/app/infrastructure/repositories/ProductRepository";
import { OrderService } from "@/app/lib/services/OrderService";
import { CustomerService } from "@/app/lib/services/CustomerService";
import { ProductService } from "@/app/lib/services/ProductService";

export interface Container {
  orderRepository: OrderRepository;
  customerRepository: CustomerRepository;
  productRepository: ProductRepository;
  orderService: OrderService;
  customerService: CustomerService;
  productService: ProductService;
}

export function createDIContainer(db: Db) {
  const container = createContainer<Container>({
    injectionMode: InjectionMode.CLASSIC
  });

  // Register database instance first
  container.register({
    db: { resolve: () => db }
  });

  // Register repositories with explicit injection
  container.register({
    orderRepository: asClass(OrderRepository).inject(() => ({ db })).singleton(),
    customerRepository: asClass(CustomerRepository).inject(() => ({ db })).singleton(),
    productRepository: asClass(ProductRepository).inject(() => ({ db })).singleton()
  });

  // Register services with explicit injection
  container.register({
    orderService: asClass(OrderService).inject((c) => ({
      orderRepository: c.resolve("orderRepository"),
      productRepository: c.resolve("productRepository")
    })).singleton(),
    customerService: asClass(CustomerService).inject((c) => ({
      customerRepository: c.resolve("customerRepository"),
      orderRepository: c.resolve("orderRepository")
    })).singleton(),
    productService: asClass(ProductService).inject((c) => ({
      productRepository: c.resolve("productRepository")
    })).singleton()
  });

  return container;
}
