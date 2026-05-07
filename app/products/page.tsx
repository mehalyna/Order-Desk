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
  Chip
} from "@mui/material";
import Navigation from "../components/Navigation";
import { connectToDatabase } from "../infrastructure/database/connection";
import { createServices } from "../lib/di/services";

export default async function ProductsPage() {
  const db = await connectToDatabase();
  const { productService } = createServices(db);

  const products = await productService.getAllProducts();

  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Products
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Read-only product catalogue for reference
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell>Stock Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} hover>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={product.inStock ? "In Stock" : "Out of Stock"}
                      color={product.inStock ? "success" : "error"}
                      size="small"
                    />
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
