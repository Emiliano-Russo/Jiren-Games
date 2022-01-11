import { configureStore } from "@reduxjs/toolkit";
import downloadSlice from "./downloadSlice";

export const store = configureStore({
  reducer: {
    download: downloadSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
