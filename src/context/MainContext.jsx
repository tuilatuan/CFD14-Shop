import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import scrollTop from "../utils/scrollTop";

const MainContext = createContext({});

const MainContextProvider = ({ children }) => {
  const pathName = useLocation();

  useEffect(() => {
    handleCloseMobileMenu();
    const myTimeOut = setTimeout(() => {
      scrollTop();
    }, 100);
    return () => {
      clearTimeout(myTimeOut);
    };
  }, [pathName]);

  const handleShowMobileMenu = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    $("body").addClass("mmenu-active");
  };
  const handleCloseMobileMenu = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").removeClass("mmenu-active");
  };

  return (
    <MainContext.Provider value={{ handleShowMobileMenu, handleCloseMobileMenu }}> {children}</MainContext.Provider>
  );
};

export default MainContextProvider;
export const useMainContext = () => useContext(MainContext);
