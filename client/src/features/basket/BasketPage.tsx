import { Grid2, Typography } from "@mui/material";
import { useFetchBasketQuery } from "./basketApi";
import BasketItem from "./BasketItem";
import OrderSummary from "./OrderSummary";

export default function BasketPage() {
  const { data, isLoading } = useFetchBasketQuery();

  if (isLoading) return <Typography>Loading basket...</Typography>;

  if (!data || data.items.length === 0)
    return <Typography variant="h4">No items in basket</Typography>;

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={8}>
        {data.items.map((item, index) => (
          <BasketItem key={index} item={item} />
        ))}
      </Grid2>
      <Grid2 size={4}>
        <OrderSummary basket={data} />
      </Grid2>
    </Grid2>
  );
}
