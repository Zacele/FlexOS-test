import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest } from "../../types/userTypes";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { access_token: string; status: string },
      LoginRequest
    >({
      query(credentials: LoginRequest) {
        console.log("credentials: ", credentials);
        return {
          url: "login",
          method: "POST",
          headers: {
            Accept: "application/json",
            "x-requested-with": "XmlHttpRequest",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(credentials),
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.getMe.initiate(null));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
