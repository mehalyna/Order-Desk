import { z } from "zod";

export const OrderStatusSchema = z.enum([
  "New",
  "Confirmed",
  "In Preparation",
  "Shipped",
  "Delivered",
  "Cancelled"
]);

export const OrderItemSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().positive()
});

export const OrderSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  customerName: z.string(),
  items: z.array(OrderItemSchema).min(1, "Order must contain at least one item"),
  status: OrderStatusSchema,
  total: z.number().nonnegative(),
  discount: z.number().min(0).max(100),
  managerNote: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date()
});

export const UpdateOrderSchema = z.object({
  status: OrderStatusSchema,
  discount: z.number().min(0).max(100),
  managerNote: z.string().optional()
}).refine(
  (data) => {
    // Discount > 20% requires a manager note
    if (data.discount > 20 && (!data.managerNote || data.managerNote.trim() === "")) {
      return false;
    }
    return true;
  },
  {
    message: "A discount greater than 20% requires a manager note",
    path: ["managerNote"]
  }
);

export const CustomerSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  address: z.string().min(1),
  createdAt: z.date()
});

export const ProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
  inStock: z.boolean()
});
