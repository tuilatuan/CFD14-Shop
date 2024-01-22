import React from "react";
import tokenMethod from "../../utils/token";
import { Link, useNavigate } from "react-router-dom";
import PATHS from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { handleLogout, handleShowModal } from "../../store/reducers/authReducer";
import { clearWishlist } from "../../store/reducers/wishlistReducer";

const HeaderTop = () => {
  // const { profile } = useAuthContext();
  const { profile } = useSelector((state) => state.auth);
  const { wishlist } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { firstName, email } = profile || "";
  const _onShowModal = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal());
  };
  const _onSignOut = (e) => {
    e.preventDefault();
    dispatch(handleLogout());
    dispatch(clearWishlist());
    navigate(PATHS.HOME);
  };
  return (
    <div className="header-top">
      <div className="container">
        <div className="header-left">
          <a href="tel:0989596912">
            <i className="icon-phone" /> Hotline: 098 9596 912{" "}
          </a>
        </div>
        <div className="header-right">
          {!!!tokenMethod.get() ? (
            <>
              {/* Not LogIn */}
              <ul className="top-menu top-link-menu">
                <li>
                  <a
                    href="#signin-modal"
                    className="top-menu-login"
                    onClick={_onShowModal}
                  >
                    <i className="icon-user" />
                    Login | Resgister{" "}
                  </a>
                </li>
              </ul>
            </>
          ) : (
            <>
              {/* Logged In */}
              <ul className="top-menu">
                <li>
                  <a href="#" className="top-link-menu">
                    <i className="icon-user" />
                    {firstName || email}{" "}
                  </a>
                  <ul>
                    <li>
                      <ul>
                        <li>
                          <Link to={PATHS.PROFILE.INDEX}>Account Details</Link>
                        </li>
                        <li>
                          <Link to={PATHS.PROFILE.ORDER}>Your Orders</Link>
                        </li>
                        <li>
                          <Link to={PATHS.PROFILE.WISHLIST}>
                            Wishlist <span>({wishlist?.length})</span>
                          </Link>
                        </li>
                        <li>
                          <a href="#" onClick={_onSignOut}>
                            Sign Out
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
