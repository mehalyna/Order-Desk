import { Db } from "mongodb";
import { Customer, Product, Order } from "@/app/lib/types";

export async function seedDatabase(db: Db): Promise<void> {
  // Clear existing data
  await db.collection("customers").deleteMany({});
  await db.collection("products").deleteMany({});
  await db.collection("orders").deleteMany({});

  // Seed customers
  const customers: Customer[] = [
    {
      id: "c1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      address: "123 Maple Street, Springfield, IL 62701",
      createdAt: new Date("2025-01-15")
    },
    {
      id: "c2",
      name: "Bob Martinez",
      email: "bob.martinez@example.com",
      address: "456 Oak Avenue, Portland, OR 97201",
      createdAt: new Date("2025-02-10")
    },
    {
      id: "c3",
      name: "Carol Williams",
      email: "carol.williams@example.com",
      address: "789 Pine Road, Austin, TX 78701",
      createdAt: new Date("2025-03-05")
    }
  ];

  await db.collection("customers").insertMany(customers);

  // Seed products (including 2 out of stock)
  const products: Product[] = [
    { id: "p1", name: "Wireless Mouse", price: 29.99, inStock: true },
    { id: "p2", name: "USB-C Cable", price: 12.99, inStock: true },
    { id: "p3", name: "Laptop Stand", price: 49.99, inStock: false },
    { id: "p4", name: "Mechanical Keyboard", price: 89.99, inStock: true },
    { id: "p5", name: "Webcam HD", price: 69.99, inStock: false },
    { id: "p6", name: "Monitor 24\"", price: 199.99, inStock: true }
  ];

  await db.collection("products").insertMany(products);

  // Seed orders (12 orders spread across all statuses)
  const orders: Order[] = [
    {
      id: "o1",
      customerId: "c1",
      customerName: "Alice Johnson",
      items: [
        { productId: "p1", productName: "Wireless Mouse", quantity: 2, price: 29.99 }
      ],
      status: "New",
      total: 59.98,
      discount: 0,
      createdAt: new Date("2026-05-01"),
      updatedAt: new Date("2026-05-01")
    },
    {
      id: "o2",
      customerId: "c2",
      customerName: "Bob Martinez",
      items: [
        { productId: "p3", productName: "Laptop Stand", quantity: 1, price: 49.99 }
      ],
      status: "New",
      total: 49.99,
      discount: 0,
      managerNote: "Customer wants expedited shipping",
      createdAt: new Date("2026-05-02"),
      updatedAt: new Date("2026-05-02")
    },
    {
      id: "o3",
      customerId: "c1",
      customerName: "Alice Johnson",
      items: [
        { productId: "p2", productName: "USB-C Cable", quantity: 3, price: 12.99 }
      ],
      status: "Confirmed",
      total: 38.97,
      discount: 0,
      createdAt: new Date("2026-04-28"),
      updatedAt: new Date("2026-04-29")
    },
    {
      id: "o4",
      customerId: "c3",
      customerName: "Carol Williams",
      items: [
        { productId: "p4", productName: "Mechanical Keyboard", quantity: 1, price: 89.99 },
        { productId: "p1", productName: "Wireless Mouse", quantity: 1, price: 29.99 }
      ],
      status: "Confirmed",
      total: 119.98,
      discount: 0,
      createdAt: new Date("2026-04-27"),
      updatedAt: new Date("2026-04-28")
    },
    {
      id: "o5",
      customerId: "c2",
      customerName: "Bob Martinez",
      items: [
        { productId: "p6", productName: "Monitor 24\"", quantity: 1, price: 199.99 }
      ],
      status: "In Preparation",
      total: 199.99,
      discount: 10,
      managerNote: "Loyal customer discount",
      createdAt: new Date("2026-04-25"),
      updatedAt: new Date("2026-04-26")
    },
    {
      id: "o6",
      customerId: "c1",
      customerName: "Alice Johnson",
      items: [
        { productId: "p2", productName: "USB-C Cable", quantity: 5, price: 12.99 }
      ],
      status: "In Preparation",
      total: 64.95,
      discount: 0,
      createdAt: new Date("2026-04-24"),
      updatedAt: new Date("2026-04-25")
    },
    {
      id: "o7",
      customerId: "c3",
      customerName: "Carol Williams",
      items: [
        { productId: "p4", productName: "Mechanical Keyboard", quantity: 2, price: 89.99 }
      ],
      status: "Shipped",
      total: 179.98,
      discount: 0,
      createdAt: new Date("2026-04-20"),
      updatedAt: new Date("2026-04-23")
    },
    {
      id: "o8",
      customerId: "c2",
      customerName: "Bob Martinez",
      items: [
        { productId: "p1", productName: "Wireless Mouse", quantity: 1, price: 29.99 }
      ],
      status: "Shipped",
      total: 29.99,
      discount: 0,
      createdAt: new Date("2026-04-19"),
      updatedAt: new Date("2026-04-22")
    },
    {
      id: "o9",
      customerId: "c1",
      customerName: "Alice Johnson",
      items: [
        { productId: "p6", productName: "Monitor 24\"", quantity: 1, price: 199.99 }
      ],
      status: "Delivered",
      total: 199.99,
      discount: 0,
      createdAt: new Date("2026-04-10"),
      updatedAt: new Date("2026-04-18")
    },
    {
      id: "o10",
      customerId: "c3",
      customerName: "Carol Williams",
      items: [
        { productId: "p2", productName: "USB-C Cable", quantity: 2, price: 12.99 }
      ],
      status: "Delivered",
      total: 25.98,
      discount: 0,
      createdAt: new Date("2026-04-08"),
      updatedAt: new Date("2026-04-16")
    },
    {
      id: "o11",
      customerId: "c2",
      customerName: "Bob Martinez",
      items: [
        { productId: "p4", productName: "Mechanical Keyboard", quantity: 1, price: 89.99 }
      ],
      status: "Cancelled",
      total: 89.99,
      discount: 0,
      managerNote: "Customer requested cancellation",
      createdAt: new Date("2026-04-15"),
      updatedAt: new Date("2026-04-16")
    },
    {
      id: "o12",
      customerId: "c1",
      customerName: "Alice Johnson",
      items: [
        { productId: "p6", productName: "Monitor 24\"", quantity: 2, price: 199.99 }
      ],
      status: "New",
      total: 399.98,
      discount: 25,
      // Note: No manager note - this triggers the validation rule
      createdAt: new Date("2026-05-03"),
      updatedAt: new Date("2026-05-03")
    }
  ];

  await db.collection("orders").insertMany(orders);

  console.log("✅ Database seeded successfully");
  console.log(`   - ${customers.length} customers`);
  console.log(`   - ${products.length} products (2 out of stock)`);
  console.log(`   - ${orders.length} orders across all statuses`);
}
