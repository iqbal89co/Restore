import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Basket } from "../../app/models/basket";
import { currencyFormat } from "../../lib/util";
import { Link } from "react-router-dom";

type Props = {
  basket?: Basket;
};

export default function OrderSummary({ basket }: Props) {
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
  const subtotal = basket.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const deliveryFee = subtotal > 10000 ? 0 : 500;
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
            <Typography color="success">
              {currencyFormat(subtotal + deliveryFee)}
            </Typography>
          </Box>
        </Box>

        <Box mt={2}>
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
