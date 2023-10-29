import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environment";
import authReducer from "./reducers/authReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: ENV === "development",
});

export default store;
