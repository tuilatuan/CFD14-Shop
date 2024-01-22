import React from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { handleShowModal } from "../../store/reducers/authReducer";
import tokenMethod from "../../utils/token";

const PrivateRoute = ({ redirecPath = "/" }) => {
  const dispatch = useDispatch();

  if (!!!tokenMethod.get()) {
    return <Navigate to={redirecPath} />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
