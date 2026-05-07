import Link from "next/link";
import { Container, Typography, Button, Box } from "@mui/material";
import Navigation from "./components/Navigation";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <Container maxWidth="md" sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h2" component="h1" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 2 }}>
          Page not found
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <Button variant="contained">
              Go Home
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}
