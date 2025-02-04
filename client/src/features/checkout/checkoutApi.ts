import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { basketApi } from "../basket/basketApi";
import { Basket } from "../../app/models/basket";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: baseQueryWithErrorHandling,
  endpoints: (builder) => ({
    createPaymentIntent: builder.mutation<Basket, void>({
      query: () => {
        return {
          url: "payment",
          method: "POST",
        };
      },
      onQueryStarted: async (_NEVER, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            basketApi.util.updateQueryData(
              "fetchBasket",
              undefined,
              (draft) => {
                draft.clientSecret = data.clientSecret;
              }
            )
          );
        } catch (error) {
          console.error("Payment intent creation failed: ", error);
        }
      },
    }),
  }),
});

export const { useCreatePaymentIntentMutation } = checkoutApi;
