import { configureStore } from "@reduxjs/toolkit";
import contactList from "./slice/contactSlice";
export const store = configureStore({
  reducer: { app: contactList },
});
