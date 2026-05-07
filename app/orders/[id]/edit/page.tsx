import { notFound } from "next/navigation";
import { Container, Typography, Paper, Box } from "@mui/material";
import Navigation from "@/app/components/Navigation";
import { connectToDatabase } from "@/app/infrastructure/database/connection";
import { createServices } from "@/app/lib/di/services";
import OrderEditForm from "./OrderEditForm";

export default async function OrderEditPage({
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

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Edit Order {order.id}
        </Typography>

        <Paper sx={{ p: 3, mt: 3 }}>
          <OrderEditForm order={order} />
        </Paper>
      </Container>
    </>
  );
}
