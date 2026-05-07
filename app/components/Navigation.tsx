"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from "@mui/material";

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { label: "Orders", path: "/orders" },
    { label: "Customers", path: "/customers" },
    { label: "Products", path: "/products" }
  ];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              sx={{
                mr: 4,
                fontWeight: 700
              }}
            >
              Order Management
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: "flex", gap: 1 }}>
            {navItems.map((item) => (
              <Link key={item.path} href={item.path} style={{ textDecoration: "none" }}>
                <Button
                  sx={{
                    color: "white",
                    backgroundColor: pathname?.startsWith(item.path)
                      ? "rgba(255, 255, 255, 0.1)"
                      : "transparent"
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
