import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
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

export default async function CustomerDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const db = await connectToDatabase();
  const { customerService, orderService } = createServices(db);

  const customer = await customerService.getCustomerById(id);

  if (!customer) {
    notFound();
  }

  const stats = await customerService.getCustomerStats(id);
  const orders = await orderService.getOrdersByCustomerId(id);

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customer Profile
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  {customer.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {customer.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  {customer.address}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Member since: {new Date(customer.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Statistics
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1">
                    Total Orders: <strong>{stats.orderCount}</strong>
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    Total Spent: <strong>${stats.totalSpent.toFixed(2)}</strong>
                  </Typography>
                  {stats.orderCount > 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      Average: ${(stats.totalSpent / stats.orderCount).toFixed(2)} per order
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order History
              </Typography>

              {orders.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No orders yet
                </Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Items</TableCell>
                        <TableCell align="right">Total</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id} hover>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>
                            <Chip
                              label={order.status}
                              color={getStatusColor(order.status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">{order.items.length}</TableCell>
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
              )}
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Link href="/customers" style={{ textDecoration: "none" }}>
            <Button variant="text">
              ← Back to Customers
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
