import {
  useClearBasketMutation,
  useFetchBasketQuery,
} from "../../features/basket/basketApi";

export const useBasket = () => {
  const { data: basket } = useFetchBasketQuery();
  const [clearBasket] = useClearBasketMutation();
  const subtotal = basket?.items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  const deliveryFee = subtotal || 0 > 10000 ? 0 : 500;
  const total = subtotal || 0 + deliveryFee;

  return { basket, total, subtotal: subtotal || 0, deliveryFee, clearBasket };
};
