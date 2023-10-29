import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import tokenMethod from "../../utils/token";
import { authService } from "../../services/authService";
import { handleGetCart } from "./cartReducer";

const initialState = {
  showedModal: false,
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
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
        message.success("Đăng nhập thành công");
        const { token: accessToken, refreshToken } = res.data.data || {};
        //luu token
        tokenMethod.set({ accessToken, refreshToken });

        // handleGetProfile();
        dispatch(handleGetProfile());
        dispatch(handleGetCart());
        dispatch(handleCloseModal());
      }
      return true;
    } catch (error) {
      message.success("Đăng nhập thất bại");
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
  async (_, { rejectWithValue }) => {
    if (tokenMethod.get()) {
      try {
        const profileRes = await authService.getProfile();
        return profileRes?.data?.data;
      } catch (error) {
        rejectWithValue(error?.response?.data);
        console.log("lay profile khong thanh cong");
      }
    }
  }
);
