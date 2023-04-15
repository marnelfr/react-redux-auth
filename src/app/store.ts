import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";

export const store = configureStore({
  reducer: {},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
