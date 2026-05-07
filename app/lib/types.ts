// Order Management Portal Types

export type OrderStatus =
  | "New"
  | "Confirmed"
  | "In Preparation"
  | "Shipped"
  | "Delivered"
  | "Cancelled";

export interface Customer {
  id: string;
  name: string;
  email: string;
  address: string;
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  items: OrderItem[];
  status: OrderStatus;
  total: number;
  discount: number;
  managerNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StatusTransition {
  from: OrderStatus;
  to: OrderStatus;
  timestamp: Date;
  note?: string;
}
