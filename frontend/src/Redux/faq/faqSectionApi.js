import { apiSlice } from "../api/apiSlice";

export const faqSectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqSection: builder.query({
      query: (query) => ({
        url: "/faqSection/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["faqSection"],
    }),
    updateFaqSection: builder.mutation({
      query: ({ id, info }) => ({
        url: `/faqSection/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["faqSection"],
    }),
    addFaqSection: builder.mutation({
      query: (info) => ({
        url: `/faqSection/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["faqSection"],
    }),
  }),
});

export const {
  useGetFaqSectionQuery,
  useAddFaqSectionMutation,
  useUpdateFaqSectionMutation,
} = faqSectionApi;
