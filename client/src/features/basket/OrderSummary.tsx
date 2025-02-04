import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { currencyFormat } from "../../lib/util";
import { Link, useLocation } from "react-router-dom";
import { useBasket } from "../../lib/hooks/useBasket";

export default function OrderSummary() {
  const { basket, total, subtotal, deliveryFee } = useBasket();
  const location = useLocation();
  if (!basket) {
    return (
      <Paper
        sx={{
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          p: 4,
        }}
      >
        <Box p={2}>
          <p>No items in basket</p>
        </Box>
      </Paper>
    );
  }
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="lg"
      mx="auto"
    >
      <Paper sx={{ mb: 2, p: 3, width: "100%", borderRadius: 3 }}>
        <Typography variant="h6" component="p" fontWeight="bold">
          Order Summary
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          Orders over $100 qualify for free delivery!
        </Typography>
        <Box mt={2}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Subtotal</Typography>
            <Typography>{currencyFormat(subtotal)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Discount</Typography>
            <Typography color="success">-{currencyFormat(0)}</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Delivery fee</Typography>
            <Typography color="success">
              {currencyFormat(deliveryFee)}
            </Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography color="textSecondary">Total</Typography>
            <Typography color="success">{currencyFormat(total)}</Typography>
          </Box>
        </Box>

        <Box mt={2}>
          {!location.pathname.includes("checkout") && (
            <Button
              component={Link}
              to="/checkout"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mb: 1 }}
            >
              Checkout
            </Button>
          )}
          <Button component={Link} to="/catalog" fullWidth>
            Continue Shopping
          </Button>
        </Box>
      </Paper>

      {/* coupon code section */}
      <Paper sx={{ width: "100%", borderRadius: 3, p: 3 }}>
        <form>
          <Typography variant="subtitle1" component="label">
            Do you have a voucher code?
          </Typography>

          <TextField
            label="Voucher code"
            variant="outlined"
            fullWidth
            sx={{ my: 2 }}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Apply code
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
