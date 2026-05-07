import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import Navigation from "@/app/components/Navigation";
import { connectToDatabase } from "@/app/infrastructure/database/connection";
import { createServices } from "@/app/lib/di/services";
import { OrderStatus } from "@/app/lib/types";

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

export default async function OrderDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await connectToDatabase();
  const { orderService } = createServices(db);

  const order = await orderService.getOrderById(id);

  if (!order) {
    notFound();
  }

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = subtotal * (order.discount / 100);

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h4" component="h1">
            Order {order.id}
          </Typography>
          <Link href={`/orders/${order.id}/edit`} style={{ textDecoration: "none" }}>
            <Button variant="contained">
              Edit Order
            </Button>
          </Link>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h6">Order Details</Typography>
                <Chip
                  label={order.status}
                  color={getStatusColor(order.status)}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Created: {new Date(order.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: {new Date(order.updatedAt).toLocaleString()}
                </Typography>
              </Box>

              <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
                Items
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Product</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item) => (
                      <TableRow key={item.productId}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box sx={{ mt: 3, textAlign: "right" }}>
                <Typography variant="body1">
                  Subtotal: ${subtotal.toFixed(2)}
                </Typography>
                {order.discount > 0 && (
                  <Typography variant="body1" color="success.main">
                    Discount ({order.discount}%): -${discountAmount.toFixed(2)}
                  </Typography>
                )}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  Total: ${order.total.toFixed(2)}
                </Typography>
              </Box>
            </Paper>

            {order.managerNote && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Manager Note
                </Typography>
                <Typography variant="body1">{order.managerNote}</Typography>
              </Paper>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Customer
                </Typography>
                <Typography variant="body1" gutterBottom>
                  <strong>{order.customerName}</strong>
                </Typography>
                <Link href={`/customers/${order.customerId}`} style={{ textDecoration: "none" }}>
                  <Button
                    size="small"
                    variant="outlined"
                    fullWidth
                  >
                    View Customer Profile
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Link href="/orders" style={{ textDecoration: "none" }}>
            <Button variant="text">
              ← Back to Orders
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
