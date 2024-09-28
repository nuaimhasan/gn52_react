import { apiSlice } from "../api/apiSlice";

export const oderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (orderInfo) => ({
        url: `/order/create-order`,
        method: "POST",
        body: orderInfo,
      }),
      invalidatesTags: ["order"],
    }),

    getAllOrders: builder.query({
      query: (query) => ({
        url: `/order/all-orders`,
        method: "GET",
        params: query,
      }),
      providesTags: ["order"],
    }),

    getOrderById: builder.query({
      query: (id) => ({
        url: `/order/single/${id}`,
        method: "GET",
      }),
      providesTags: ["order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/order/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/order/update/status/${id}`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} = oderApi;
