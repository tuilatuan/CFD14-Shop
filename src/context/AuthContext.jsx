import React, { createContext, useEffect, useState } from "react";
import { useContext } from "react";
import { authService } from "../services/authService";
import PATHS from "../constants/path";
import tokenMethod from "../utils/token";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { handleGetProfile } from "../store/reducers/authReducer";

const AuthContext = createContext({});
const AuthContextProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // dong mo modal
  // const handleShowModal = (e) => {
  //   e?.stopPropagation();
  //   e?.preventDefault();
  //   setShowModal(true);
  // };
  // const handleCloseModal = (e) => {
  //   e?.stopPropagation();
  //   e?.preventDefault();
  //   setShowModal(false);
  // };
  //dang ky, dang nhap
  // const handleLogin = async (loginData, callback) => {
  //   try {
  //     setLoading(true);

  //     const { email, password } = { ...loginData };
  //     const payload = { email: email, password: password };
  //     const res = await authService.login(payload);
  //     if (res?.data.data) {
  //       console.log("tr ve", res.data.data);
  //       message.success("Đăng nhập thành công");
  //       const { token: accessToken, refreshToken } = res.data.data || {};
  //       //luu token
  //       tokenMethod.set({ accessToken, refreshToken });

  //       handleGetProfile();

  //       handleCloseModal();
  //     }
  //   } catch (error) {
  //     message.success("Đăng nhập thất bại");
  //     console.log("error", error);
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 400);
  //     callback?.();
  //   }
  // };

  // const handleRegister = async (registerData, callback) => {
  //   try {
  //     setLoading(true);

  //     const { name, email, password } = registerData;
  //     const payload = {
  //       firstName: name || "",
  //       lastName: "",
  //       email: email,
  //       password: password,
  //     };
  //     const res = await authService.register(payload);
  //     if (res?.data?.data.id) {
  //       console.log("res", res);
  //       handleLogin({ email, password });
  //       handleCloseModal();
  //       message.success("Đăng ký thành công!");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     if (error?.response?.status === 403) {
  //       message.error("Email đã tồn tại!!");
  //     } else {
  //       message.error("Đăng ký không thành công");
  //     }
  //   } finally {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 400);

  //     callback?.();
  //   }
  // };

  //lay thong tin
  // const handleGetProfile = async () => {
  //   try {
  //     const profileRes = await authService.getProfile();
  //     // console.log("profileRes.data.?.data", profileRes.data?.data);
  //     if (profileRes.data?.data) {
  //       setProfile(profileRes.data.data);
  //     }
  //   } catch (error) {
  //     console.log("lay profile khong thanh cong");
  //   }
  // };

  //cap nhat thong tin tai khoan
  // const handleUpdateProfile = async (profileData) => {
  //   try {
  //     const { firstName, email, password, facebookURL, introduce, phone, website } = profileData;
  //     const payload = {
  //       firstName: firstName,
  //       lastName: "",
  //       email,
  //       password,
  //       facebookURL,
  //       website,
  //       introduce,
  //       phone,
  //     };

  //     const res = await authService.updateProfiles(payload);
  //     if (res?.data?.data?.id) {
  //       message.success("Cập nhật thông tin thành công");
  //       handleGetProfile();
  //     }
  //   } catch (error) {
  //     // console.log("error", error);
  //   }
  // };

  // const handleLogout = (e) => {
  //   e?.preventDefault();
  //   tokenMethod.remove();
  //   setProfile(undefined);
  //   navigate(PATHS.HOME);
  // };

  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
    }
  }, []);
  return (
    <AuthContext.Provider
      value={
        {
          // showModal,
          // handleUpdateProfile,
          // handleLogout,
          // profile,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
export const useAuthContext = () => useContext(AuthContext);
