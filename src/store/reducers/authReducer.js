import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import tokenMethod from "../../utils/token";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";
import thunk from "redux-thunk";
import { updateWishlist } from "./wishlistReducer";
import axiosInstance from "../../utils/axiosInstance";
import { formatDate } from "../../utils/format";
import { orderService } from "../../services/orderService";

const initialState = {
  showedModal: false,
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
    updateOrder: false,
  },
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleShowModal: (state) => {
      state.showedModal = true;
    },
    handleCloseModal: (state) => {
      state.showedModal = false;
    },
    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      state.showedModal = false;
      message.success("Đăng xuất thành công");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleGetProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.rejected, (state) => {
        state.loading.getProfile = false;
      })
      .addCase(handleGetProfile.pending, (state) => {
        state.loading.getProfile = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading.login = false;
        state.showedModal = "";
      })
      .addCase(handleLogin.rejected, (state) => {
        state.loading.login = false;
      })
      .addCase(handleLogin.pending, (state) => {
        state.loading.login = true;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.loading.register = false;
        state.showedModal = "";
      })
      .addCase(handleRegister.rejected, (state) => {
        state.loading.register = false;
      })
      .addCase(handleRegister.pending, (state) => {
        state.loading.register = true;
      })
      .addCase(handleGetOrder.fulfilled, (state, action) => {
        state.loading.updateOrder = false;
        state.profile.orders = action.payload;
      })
      .addCase(handleGetOrder.rejected, (state) => {
        state.loading.updateOrder = false;
      })
      .addCase(handleGetOrder.pending, (state) => {
        state.loading.updateOrder = true;
      });
  },
});
const { actions, reducer: authReducer } = authSlice;
export const { handleLogout, handleShowModal, handleCloseModal } = actions;
export default authReducer;

export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (loginData, { dispatch, getState }) => {
    try {
      const { email, password } = { ...loginData };
      const payload = { email: email, password: password };
      const res = await authService.login(payload);
      if (res?.data.data) {
        console.log("tra ve token", res.data.data);
        const { token: accessToken, refreshToken } = res.data.data || {};
        //luu token
        tokenMethod.set({ accessToken, refreshToken });

        // handleGetProfile();
        dispatch(handleGetProfile());
        dispatch(handleGetCart());
        dispatch(handleCloseModal());
        message.success("Đăng nhập thành công");
      }
      return true;
    } catch (error) {
      message.error("Đăng nhập thất bại");
      console.log("error", error);
    } finally {
      // setTimeout(() => {
      //   setLoading(false);
      // }, 400);
      callback?.();
    }
  }
);
export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (registerData, { dispatch, getState, rejectWithValue }) => {
    try {
      const res = await authService.register(registerData);
      const { email, password } = registerData;
      if (res?.data?.data.id) {
        dispatch(handleLogin({ email, password }));
        dispatch(handleCloseModal());

        message.success("Đăng ký thành công!");
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      const errorInfo = error?.response?.data;
      if (errorInfo === "Forbidden") {
        message.error("Email đã tồn tại!!");
      } else {
        message.error("Đăng ký không thành công");
        return rejectWithValue(error);
      }
    } finally {
      // setTimeout(() => {
      //   setLoading(false);
      // }, 400);

      callback?.();
    }
  }
);

export const handleGetProfile = createAsyncThunk(
  "auth/getProfile",
  async (_, { rejectWithValue, dispatch }) => {
    if (tokenMethod.get()) {
      try {
        const profileRes = await authService.getProfile();
        dispatch(updateWishlist(profileRes?.data?.data?.whiteList));
        dispatch(handleGetOrder());
        return profileRes?.data?.data;
      } catch (error) {
        rejectWithValue(error?.response?.data);
        console.log("lay profile khong thanh cong");
      }
    }
  }
);

export const handleUpdateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updateData, { dispatch, getState, rejectWithValue }) => {
    try {
      console.log("updateData :>> ", updateData);
      const { firstName, phone, birthday, province, district, ward, street } =
        updateData || {};

      const payloadUpdate = {
        firstName: firstName,
        lastName: "",
        phone: phone,
        birthday: birthday,
        province: province?.value,
        district: district?.value,
        ward: ward?.value,
        street: `${street}, ${ward?.label || ""}, ${district?.label || ""}, ${
          province?.label || ""
        } `,
      };

      const res = await authService.updateProfiles(payloadUpdate);
      dispatch(handleGetProfile());

      console.log("res :>> ", res);
    } catch (error) {
      console.log("error :>> ", error);
      // return rejectWithValue(error);
    }
  }
);

export const handleChangePass = createAsyncThunk(
  "auth/updateProfile",
  async (passData, { dispatch, rejectWithValue }) => {
    try {
      const { firstName, phone, password, newPassword } = passData || {};
      const payload = {
        firstName: firstName,
        lastName: "",
        phone: phone,
        password: password,
        newPassword: newPassword,
      };
      const res = await authService.updateProfiles(payload);
      if (res?.data?.data.id) {
        message.success("Cập nhật mật khẩu thành công");
        dispatch(handleGetProfile());
        return true;
      } else {
        throw false;
      }
      message.success("Cập nhật mật khẩu thành công");
    } catch (error) {
      console.log("error :>> ", error);
      message.error("Cập nhật mật khẩu thất bại");
      return false;
    }
  }
);

export const handleGetOrder = createAsyncThunk(
  "auth/getOrder",
  async (_, { dispatch, rejectWithValue }) => {
    if (tokenMethod.get()) {
      try {
        const orderRes = await orderService.getOrder();
        return orderRes?.data?.data.orders;
      } catch (error) {
        console.log("error :>> ", error);
      }
    }
  }
);
