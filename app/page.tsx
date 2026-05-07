import Link from "next/link";
import { Container, Typography, Box, Card, CardContent, Button } from "@mui/material";
import Navigation from "./components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to Order Management Portal
        </Typography>

        <Typography variant="body1" sx={{ mb: 2 }}>
          A training environment for processing online store orders. This portal allows
          managers to accept orders, update their status, and view customer details.
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 3, mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Orders
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View and manage all orders. Update status, apply discounts, and add internal notes.
              </Typography>
              <Link href="/orders" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  View Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Customers
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Browse customer profiles and view their order history.
              </Typography>
              <Link href="/customers" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  View Customers
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Products
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                View product catalogue with pricing and stock status.
              </Typography>
              <Link href="/products" style={{ textDecoration: "none" }}>
                <Button variant="contained">
                  View Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ mt: 6, p: 3, bgcolor: "background.paper", borderRadius: 1 }}>
          <Typography variant="h6" gutterBottom>
            Status Pipeline
          </Typography>
          <Typography variant="body2" sx={{ fontFamily: "monospace" }}>
            New → Confirmed → In Preparation → Shipped → Delivered
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;↘ Cancelled
          </Typography>
        </Box>
      </Container>
    </>
  );
}
