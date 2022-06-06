import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Events } from "../../types/eventTypes";
import type { AppState } from "../store";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.CUSTOM_NODEJS_SERVER,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).authState.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<Events[], null>({
      query() {
        return {
          url: "events",
          credentials: "include",
        };
      },
    }),
  }),
});

export const { useGetEventsQuery } = eventsApi;
