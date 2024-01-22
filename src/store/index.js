import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "../constants/environment";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import wishlistReducer from "./reducers/wishlistReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  devTools: ENV === "development",
});

export default store;
