import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { LoginRequest } from "../../types/userTypes";
import { userApi } from "./userApi";
import { setCookies } from "cookies-next";

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Auth"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
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
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data) {
            // SET TOKEN COOKIE TO EXPIRE IN 1 DAY
            setCookies("token", data.data.bearer_token, {
              maxAge: 60 * 60 * 24,
            });
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
