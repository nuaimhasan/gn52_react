import { apiSlice } from "../api/apiSlice";

export const featureApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeature: builder.query({
      query: (query) => ({
        url: "/feature/all",
        method: "GET",
        params: query,
      }),
      providesTags: ["feature"],
    }),
    updateFeature: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/feature/update/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["feature"],
    }),
    addFeature: builder.mutation({
      query: (formData) => ({
        url: `/feature/add`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["feature"],
    }),
    deleteFeatureById: builder.mutation({
      query: (id) => ({
        url: `/feature/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feature"],
    }),
    getFeatureById: builder.query({
      query: (id) => ({
        url: `/feature/${id}`,
        method: "GET"
      }),
      providesTags: ["feature"],
    }),
  }),
});

export const {
  useGetAllFeatureQuery,
  useUpdateFeatureMutation,
  useAddFeatureMutation,
  useDeleteFeatureByIdMutation,
  useGetFeatureByIdQuery,
} = featureApi;
