import { Grid2 } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";

type props = {
  products: Product[];
};

export default function ProductList({ products }: props) {
  return (
    <Grid2 container spacing={3}>
      {products.map((product) => (
        <Grid2 key={product.id} size={3} display="flex">
          <ProductCard key={product.id} product={product} />
        </Grid2>
      ))}
    </Grid2>
  );
}
