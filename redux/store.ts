import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { authApi } from "./apis/authApi";
import { userApi } from "./apis/userApi";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      [authApi.reducerPath]: authApi.reducer,
      [userApi.reducerPath]: userApi.reducer,
      userState: UserReducer,
      authState: AuthReducer
    },
    devTools: process.env.NODE_ENV === "development",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({}).concat([authApi.middleware, userApi.middleware]),
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
