import React, { useEffect } from "react";
import MainContextProvider from "../../context/MainContext";
import AuthContextProvider from "../../context/AuthContext";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer";
import MenuMobile from "../../components/MenuMobile";
import BackToTop from "../../components/BacktoTop";
import AuthenModal from "../../components/AuthenModal";
import tokenMethod from "../../utils/token";
import { useDispatch } from "react-redux";
import { handleGetProfile } from "../../store/reducers/authReducer";

const MainLayout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (tokenMethod.get()) {
      dispatch(handleGetProfile());
    }
  }, []);
  return (
    <MainContextProvider>
      <AuthContextProvider>
        <div className="page-wrapper">
          <Header />

          <Outlet />

          <Footer />
        </div>
        <BackToTop />
        <MenuMobile />
        <AuthenModal />
      </AuthContextProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
