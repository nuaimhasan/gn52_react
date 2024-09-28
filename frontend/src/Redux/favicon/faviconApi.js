import { apiSlice } from "../api/apiSlice";

export const faviconApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFavicon: builder.query({
      query: () => ({
        url: "/favicon/all",
      }),
    }),

    add: builder.mutation({
      query: (formData) => ({
        url: `/favicon/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),

    update: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/favicon/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["favicon"],
    }),
  }),
});

export const { useGetFaviconQuery, useAddMutation, useUpdateMutation } =
  faviconApi;
