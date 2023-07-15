import { createSlice } from "@reduxjs/toolkit";

const defaultAuthValue = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "authentication",
  initialState: defaultAuthValue,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
