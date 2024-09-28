import { apiSlice } from "../api/apiSlice";

export const featureSectionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeatureSection: builder.query({
      query: (query) => ({
        url: "/featureSection/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["featureSection"],
    }),
    updateFeatureSection: builder.mutation({
      query: ({ id, info }) => ({
        url: `/featureSection/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["featureSection"],
    }),
    addFeatureSection: builder.mutation({
      query: (info) => ({
        url: `/featureSection/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["featureSection"],
    }),
  }),
});

export const {
  useGetFeatureSectionQuery,
  useAddFeatureSectionMutation,
  useUpdateFeatureSectionMutation,
} = featureSectionApi;
