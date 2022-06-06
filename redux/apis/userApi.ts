import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../types/userTypes";
import { setUser } from "../features/userSlice";
import type { AppState } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).authState.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMe: builder.query<User, null>({
      query() {
        return {
          url: "user",
        };
      },
      transformResponse: (result: User) => result,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (error) {
          console.error("error", error);
        }
      },
    }),
  }),
});

export const { useGetMeQuery } = userApi;
