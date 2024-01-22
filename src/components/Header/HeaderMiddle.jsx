import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { MenuUl } from "../StyledComponent";
import { useMainContext } from "../../context/MainContext";
import PATHS from "../../constants/path";
import Search from "../Search";
import CartDropDown from "../CartDropDown";
import useHeaderMiddle from "../../hooks/useHeaderMiddle";

const HeaderMiddle = () => {
  const { handleShowMobileMenu, cartDropdownProps } = useHeaderMiddle();

  return (
    <div className="header-middle sticky-header">
      <div className="container">
        <div className="header-left">
          <button className="mobile-menu-toggler" onClick={handleShowMobileMenu}>
            <span className="sr-only">Toggle mobile menu</span>
            <i className="icon-bars" />
          </button>
          <Link to={PATHS.HOME} className="logo">
            <img src="/assets/images/logo.svg" alt="Molla Logo" width={160} />
          </Link>
        </div>
        <nav className="main-nav">
          <MenuUl className="menu">
            <li>
              <NavLink to={PATHS.HOME}>Home</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.ABOUT}>About Us</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.PRODUCT.INDEX}>Product</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.BLOG.INDEX}>Blog</NavLink>
            </li>
            <li>
              <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
            </li>
          </MenuUl>
        </nav>
        <div className="header-right">
          <Search />
          <CartDropDown {...cartDropdownProps} />
        </div>
      </div>
    </div>
  );
};

export default HeaderMiddle;
