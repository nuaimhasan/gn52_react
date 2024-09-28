import { apiSlice } from "../api/apiSlice";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (query) => ({
        url: "/product/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["product"],
    }),
    
    getProductById: builder.query({
      query: ({id}) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/product/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: `/product/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  useDeleteProductByIdMutation,
} = productApi;
