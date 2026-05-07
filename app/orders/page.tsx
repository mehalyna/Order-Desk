import Link from "next/link";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button
} from "@mui/material";
import Navigation from "../components/Navigation";
import { connectToDatabase } from "../infrastructure/database/connection";
import { seedDatabase } from "../infrastructure/database/seed";
import { createServices } from "../lib/di/services";
import { OrderStatus } from "../lib/types";

function getStatusColor(status: OrderStatus): "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info" {
  const colors: Record<OrderStatus, "default" | "primary" | "secondary" | "success" | "warning" | "error" | "info"> = {
    "New": "info",
    "Confirmed": "primary",
    "In Preparation": "warning",
    "Shipped": "secondary",
    "Delivered": "success",
    "Cancelled": "error"
  };
  return colors[status];
}

export default async function OrdersPage() {
  const db = await connectToDatabase();

  // Seed database on first load
  const ordersCount = await db.collection("orders").countDocuments();
  if (ordersCount === 0) {
    await seedDatabase(db);
  }

  const { orderService } = createServices(db);
  const orders = await orderService.getAllOrders();

  return (
    <>
      <Navigation />
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Orders
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Items</TableCell>
                <TableCell align="right">Discount</TableCell>
                <TableCell align="right">Total</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id} hover>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>
                    <Chip
                      label={order.status}
                      color={getStatusColor(order.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">{order.items.length}</TableCell>
                  <TableCell align="right">{order.discount}%</TableCell>
                  <TableCell align="right">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/orders/${order.id}`} style={{ textDecoration: "none" }}>
                      <Button
                        size="small"
                        variant="outlined"
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
}
