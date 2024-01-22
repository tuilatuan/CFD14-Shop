import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { handleLogout } from "../../store/reducers/authReducer";
import PATHS from "../../constants/path";

const NavAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const _onSignOut = (e) => {
    e?.preventDefault();
    dispatch(handleLogout());
    navigate(PATHS.HOME);
  };
  return (
    <aside className="col-md-4 col-lg-3">
      <ul className="nav nav-dashboard flex-column mb-3 mb-md-0" role="tablist">
        <li className="nav-item">
          <NavLink end className="nav-link " to={PATHS.PROFILE.INDEX}>
            Account Details
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className="nav-link" to={PATHS.PROFILE.ORDER}>
            Orders
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className="nav-link" to={PATHS.PROFILE.ADRESSES}>
            Adresses
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className="nav-link" to={PATHS.PROFILE.WISHLIST}>
            Wishlist
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink end className="nav-link" to={PATHS.PROFILE.CHANGEPASS}>
            Change Pass
          </NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#" onClick={_onSignOut}>
            Sign Out
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default NavAccount;
