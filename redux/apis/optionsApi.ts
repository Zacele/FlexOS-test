import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Options } from "../../types/optionsTypes";
import type { AppState } from "../store";

export const optionsApi = createApi({
  reducerPath: "optionsApi",
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
  tagTypes: ["Options"],
  endpoints: (builder) => ({
    getOptions: builder.query<Options[], null>({
      query() {
        return {
          url: "options",
        };
      },
    }),
  }),
});

export const { useGetOptionsQuery } = optionsApi;
