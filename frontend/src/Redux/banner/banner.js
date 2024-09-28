import { apiSlice } from "../api/apiSlice";

export const bannerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanner: builder.query({
      query: () => ({
        url: "/banner/all",
      }),
      providesTags: ["banner"],
    }),

    addBanner: builder.mutation({
      query: (info) => ({
        url: `/banner/add`,
        method: "POST",
        body: info,
      }),
      invalidatesTags: ["banner"],
    }),

    updateBanner: builder.mutation({
      query: ({ id, info }) => ({
        url: `/banner/update/${id}`,
        method: "PATCH",
        body: info,
      }),
      invalidatesTags: ["banner"],
    }),
  }),
});

export const {
  useGetBannerQuery,
  useAddBannerMutation,
  useUpdateBannerMutation,
} = bannerApi;
