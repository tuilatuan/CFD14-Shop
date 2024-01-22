import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { handleGetProfile, handleShowModal } from "./authReducer";
import { message } from "antd";
import { productService } from "../../services/productServider";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  initialState,
  name: "wishlist",
  reducers: {
    updateWishlist: (state, action) => {
      state.wishlist = action.payload || state.wishlist;
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleAddProductWishList.pending, (state) => {});
    builder.addCase(handleAddProductWishList.fulfilled, (state, action) => {});
    builder.addCase(handleAddProductWishList.rejected, (state) => {});
    builder.addCase(handleDeleteProductWishList.pending, (state) => {});
    builder.addCase(handleDeleteProductWishList.fulfilled, (state, action) => {});
    builder.addCase(handleDeleteProductWishList.rejected, (state) => {});
  },
});
const { actions, reducer: wishlistReducer } = wishlistSlice;
export const { updateWishlist, clearWishlist } = actions;
export default wishlistReducer;

export const handleDeleteProductWishList = createAsyncThunk(
  "wishlist/delete",
  async (actionPayload, thunkApi) => {
    try {
      await productService.removeProductInWishlist(actionPayload);
      thunkApi.dispatch(handleGetProfile());
      message.success("Remove from wishlist successfully!");
      return true;
    } catch (error) {
      thunkApi.rejectWithValue(error);
    }
  }
);

export const handleAddProductWishList = createAsyncThunk(
  "wishlist/add",
  async (actionPayload, thunkApi) => {
    const { wishlist } = thunkApi.getState()?.wishlist || {};
    const isAddedWishlist = wishlist?.some((item) => item?.id === actionPayload?.product);
    if (!tokenMethod.get()) return thunkApi.dispatch(handleShowModal());
    if (isAddedWishlist)
      return message.warning("The product already exists in the wishlist");
    try {
      await productService.addProductToWishlist(actionPayload);
      thunkApi.dispatch(handleGetProfile());
      message.success("Add to wishlist successfully");
      return true;
    } catch (error) {
      thunkApi.rejectWithValue(error);
      message.error("Add to wish list failed");
    }
  }
);
