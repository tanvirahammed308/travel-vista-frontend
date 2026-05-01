import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import tourReducer from "./features/tour/tourSlice"


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
  },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;