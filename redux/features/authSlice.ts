import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";
import { removeCookies } from "cookies-next";
import Router from "next/router";

type IAuthState = {
  token: string | null | undefined | boolean;
};

const initialState: IAuthState = {
  token: null,
};

export const authSlice = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    setToken: (
      state,
      action: PayloadAction<string | null | undefined | boolean>
    ) => {
      state.token = action.payload;
    },
    logout: () => {
      removeCookies("token");
      Router.push('/login')
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.loginUser.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.data.bearer_token;
      }
    );
  },
});

export default authSlice.reducer;

export const { setToken, logout } = authSlice.actions;
