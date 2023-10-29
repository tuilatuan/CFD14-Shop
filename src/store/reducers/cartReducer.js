import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { authService } from "../../services/authService";

const initialState = {
  cartInfo: {},
  cartLoading: false,
};
export const cartSlide = createSlice({
  initialState,
  name: "cart",
  reducers: {
    updateCacheCart: (state, action) => {
      state.cartInfo = action.payload || state.cartInfo;
    },
    clearCart: (state) => {
      state.cartInfo = {};
    },
  },
});

const { actions, reducers: cartReducer } = cartSlide;
export const { updateCacheCart, clearCart } = actions;
export default cartReducer;

export const handleGetCart = createAsyncThunk(
  "cart/get",
  async (_, { rejectWithValue }) => {
    try {
      const cartRes = await cartServices.getCart();
      return cartRes.data?.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {}
);
