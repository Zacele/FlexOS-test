import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

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

export const { setToken } = authSlice.actions;
