import { apiSlice } from "../api/apiSlice";

export const businessApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBusiness: builder.query({
      query: () => ({
        url: "/business/all",
      }),
      providesTags: ["business"],
    }),

    addBusiness: builder.mutation({
      query: (info) => ({
        url: `/business/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["business"],
    }),

    updateBusiness: builder.mutation({
      query: ({ id, info }) => ({
        url: `/business/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["business"],
    }),
  }),
});

export const {
  useGetBusinessQuery,
  useAddBusinessMutation,
  useUpdateBusinessMutation,
} = businessApi;
