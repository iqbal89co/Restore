import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Divider,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useFetchProductDetailsQuery } from "./catalogApi";
import {
  useAddBasketItemMutation,
  useFetchBasketQuery,
  useRemoveBasketItemMutation,
} from "../basket/basketApi";

export default function ProductDetails() {
  const { id } = useParams();
  const [removeBasketItem] = useRemoveBasketItemMutation();
  const [addBasketItem] = useAddBasketItemMutation();
  const { data: basket } = useFetchBasketQuery();
  const item = basket?.items.find((x) => x.productId === +id!);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
  }, [item]);

  const { data: product, isLoading } = useFetchProductDetailsQuery(Number(id));

  if (!product || isLoading) return <div>Loading...</div>;

  const handleUpdateBasket = () => {
    const updatedQuantity = item
      ? Math.abs(quantity - item.quantity)
      : quantity;
    if (!item || quantity > item.quantity) {
      addBasketItem({ product, quantity: updatedQuantity });
    } else {
      removeBasketItem({ productId: product.id, quantity: updatedQuantity });
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.currentTarget.value);

    if (value >= 0) setQuantity(value);
  };

  if (!product || isLoading) return <div>Loading...</div>;

  const productDetails = [
    { label: "Name", value: product.name },
    { label: "Description", value: product.description },
    { label: "Type", value: product.type },
    { label: "Brand", value: product.brand },
    { label: "Quantity in Stock", value: product.quantityInStock },
  ];

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img
          src={product.pictureUrl}
          alt={product.name}
          style={{ width: "100%" }}
        />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h5">
          ${(product.price / 100).toFixed(2)}
        </Typography>
        <TableContainer>
          <Table
            sx={{
              "& td": { fontSize: "1rem" },
            }}
          >
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {detail.label}
                  </TableCell>
                  <TableCell>{detail.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={2}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in basket"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              sx={{ height: "55px" }}
              onClick={handleUpdateBasket}
              disabled={
                quantity === item?.quantity || (!item && quantity === 0)
              }
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Basket"}
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  );
}
