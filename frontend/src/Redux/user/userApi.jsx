import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginInfo) => ({
        url: "/user/login",
        method: "POST",
        body: loginInfo,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem("token", result?.data?.token);

          dispatch(
            userLoggedIn({
              token: result?.data?.token,
              data: result?.data,
            })
          );
        } catch (error) {
          // Do not any thing , handel error from ui
        }
      },
    }),

    getAdmins: builder.query({
      query: () => ({
        url: "/user/all",
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    getAdminById: builder.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),

    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/user/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admin"],
    }),

    addAdmin: builder.mutation({
      query: (adminInfo) => ({
        url: `/user/add-admin`,
        method: "POST",
        body: adminInfo,
      }),
      invalidatesTags: ["admin"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetAdminsQuery,
  useDeleteAdminMutation,
  useGetAdminByIdQuery,
  useAddAdminMutation,
} = userApi;
