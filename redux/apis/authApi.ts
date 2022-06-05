import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCookie } from "../../helpers";
import { LoginRequest } from "../../types/userTypes";
import { userApi } from "./userApi";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.CUSTOM_NODEJS_SERVER,
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<
      { data: { bearer_token: string; status: string } },
      LoginRequest
    >({
      query(credentials: LoginRequest) {
        return {
          url: "login",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: {
            email: credentials.email,
            password: credentials.password,
          },
          credentials: "include",
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            // SET TOKEN COOKIE TO EXPIRE IN 1 DAY
            setCookie("token", data.data.bearer_token, 1);
            await dispatch(userApi.endpoints.getMe.initiate(null));
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
