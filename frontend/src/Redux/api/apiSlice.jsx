import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: async (headers) => {
      const token = localStorage.getItem("gn52_jwt");
      if (token) {
        headers.set("Authorization", `bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "user",
    "order",
    "banner",
    "businessInfo",
    "faq",
    "favicon",
    "feature",
    "logo",
    "order",
    "product",
    "seo",
  ],
});
