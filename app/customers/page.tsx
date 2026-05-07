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
  Button
} from "@mui/material";
import Navigation from "../components/Navigation";
import { connectToDatabase } from "../infrastructure/database/connection";
import { createServices } from "../lib/di/services";

export default async function CustomersPage() {
  const db = await connectToDatabase();
  const { customerService } = createServices(db);

  const customers = await customerService.getAllCustomers();

  // Get stats for each customer
  const customersWithStats = await Promise.all(
    customers.map(async (customer) => {
      const stats = await customerService.getCustomerStats(customer.id);
      return { ...customer, ...stats };
    })
  );

  return (
    <>
      <Navigation />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Customers
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Orders</TableCell>
                <TableCell align="right">Total Spent</TableCell>
                <TableCell>Member Since</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customersWithStats.map((customer) => (
                <TableRow key={customer.id} hover>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell align="right">{customer.orderCount}</TableCell>
                  <TableCell align="right">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="right">
                    <Link href={`/customers/${customer.id}`} style={{ textDecoration: "none" }}>
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
