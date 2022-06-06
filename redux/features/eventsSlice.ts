import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/userTypes";

interface IUserState {
  user: User | null;
}

const initialState: IUserState = {
  user: null,
};

export const eventSlice = createSlice({
  initialState,
  name: "eventSlice",
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export default eventSlice.reducer;

export const { setUser } = eventSlice.actions;
