import React, { useState } from "react";
import { useMainContext } from "../../context/MainContext";
import { MenuUl } from "../StyledComponent";
import { Link, NavLink } from "react-router-dom";
import PATHS from "../../constants/path";
import cn from "../../utils/cn";

const MENU = {
  menu: "menu",
  cate: "categories",
};
const MenuMobile = () => {
  const { handleCloseMobileMenu } = useMainContext();
  const [selectedTab, setSelectedTab] = useState(MENU.menu);

  const _onChange = (e, tab) => {
    e?.preventDefault();
    setSelectedTab(tab);
  };
  return (
    <>
      {/* Mobile Menu */}
      <div className="mobile-menu-overlay" onClick={handleCloseMobileMenu}></div>
      {/* End .mobil-menu-overlay */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span className="mobile-menu-close" onClick={handleCloseMobileMenu}>
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <MenuUl className="nav nav-pills-mobile nav-border-anim" role="tablist">
            <li className="nav-item">
              <a
                className={cn("nav-link", { active: selectedTab === MENU.menu })}
                // id="mobile-menu-link"
                // data-toggle="tab"
                href="#mobile-menu-tab"
                // role="tab"
                // aria-controls="mobile-menu-tab"
                // aria-selected="true"
                onClick={(e) => _onChange(e, MENU.menu)}
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={cn("nav-link", { active: selectedTab === MENU.cate })}
                // id="mobile-cats-link"
                // data-toggle="tab"
                href="#mobile-cats-tab"
                // role="tab"
                // aria-controls="mobile-cats-tab"
                // aria-selected="false"
                onClick={(e) => _onChange(e, MENU.cate)}
              >
                Categories
              </a>
            </li>
          </MenuUl>
          <div className="tab-content">
            <div
              className={cn("tab-pane fade", {
                show: selectedTab === MENU.menu,
                active: selectedTab === MENU.menu,
              })}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <MenuUl className="mobile-menu">
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
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
            <div
              className={cn("tab-pane fade", {
                show: selectedTab === MENU.cate,
                active: selectedTab === MENU.cate,
              })}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <MenuUl className="mobile-cats-menu">
                  <li>
                    <a className="mobile-cats-lead" href="#">
                      TV
                    </a>
                  </li>
                  <li>
                    <a href="#">Computers</a>
                  </li>
                  <li>
                    <a href="#">Tablets &amp; Cell Phones</a>
                  </li>
                  <li>
                    <a href="#">Smartwatches</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                </MenuUl>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a href="#" className="social-icon" target="_blank" title="Facebook">
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Instagram">
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
      {/* End .mobile-menu-container */}
    </>
  );
};

export default MenuMobile;
