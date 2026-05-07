"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Alert,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material";
import { Order, OrderStatus } from "@/app/lib/types";

const statusOptions: OrderStatus[] = [
  "New",
  "Confirmed",
  "In Preparation",
  "Shipped",
  "Delivered",
  "Cancelled"
];

export default function OrderEditForm({ order }: { order: Order }) {
  const router = useRouter();
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [discount, setDiscount] = useState(order.discount);
  const [managerNote, setManagerNote] = useState(order.managerNote || "");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const calculatedTotal = subtotal * (1 - discount / 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch(`/api/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          discount,
          managerNote: managerNote.trim() || undefined
        })
      });

      const result = await response.json();

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      router.push(`/orders/${order.id}`);
      router.refresh();
    } catch (err) {
      setError("Failed to update order");
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
        Order Items
      </Typography>
      <Table size="small" sx={{ mb: 3 }}>
        <TableBody>
          {order.items.map((item) => (
            <TableRow key={item.productId}>
              <TableCell>{item.productName}</TableCell>
              <TableCell align="right">
                {item.quantity} × ${item.price.toFixed(2)}
              </TableCell>
              <TableCell align="right">
                ${(item.price * item.quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={2}>
              <strong>Subtotal</strong>
            </TableCell>
            <TableCell align="right">
              <strong>${subtotal.toFixed(2)}</strong>
            </TableCell>
          </TableRow>
          {discount > 0 && (
            <TableRow>
              <TableCell colSpan={2}>Discount ({discount}%)</TableCell>
              <TableCell align="right" sx={{ color: "success.main" }}>
                -${(subtotal * (discount / 100)).toFixed(2)}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell colSpan={2}>
              <strong>Total</strong>
            </TableCell>
            <TableCell align="right">
              <strong>${calculatedTotal.toFixed(2)}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TextField
        select
        fullWidth
        label="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value as OrderStatus)}
        margin="normal"
        required
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        type="number"
        label="Discount (%)"
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
        margin="normal"
        slotProps={{ htmlInput: { min: 0, max: 100, step: 1 } }}
        required
        helperText="Discounts greater than 20% require a manager note"
      />

      <TextField
        fullWidth
        multiline
        rows={3}
        label="Manager Note"
        value={managerNote}
        onChange={(e) => setManagerNote(e.target.value)}
        margin="normal"
        helperText={
          discount > 20 && !managerNote.trim()
            ? "Required for discounts > 20%"
            : ""
        }
        error={discount > 20 && !managerNote.trim()}
      />

      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.back()}
          disabled={loading}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}
