import React, { useState } from "react";
import cn from "../../utils/cn";
import Input from "../Input";
import { MESSAGE, REGREX } from "../../constants/regex";
import { useAuthContext } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/reducers/authReducer";

const ModalLogin = ({ modalType }) => {
  // const { handleLogin } = useAuthContext();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const _onSubmit = (data) => {
    dispatch(handleLogin(data));
  };
  return (
    <div className="tab-pane fade show active" id="signin">
      <form action="#" onSubmit={handleSubmit(_onSubmit)}>
        <Input
          label="Username or email address"
          type="email"
          placeholder="Username or email address"
          required
          {...register("email", {
            required: MESSAGE.require,
            pattern: {
              value: REGREX.email,
              message: MESSAGE.email,
            },
          })}
          errors={errors?.email?.message || ""}
        />
        {/* End .form-group */}

        <Input
          label="Password "
          placeholder="Password"
          type="password"
          required
          {...register("password", {
            required: MESSAGE.require,
            pattern: {
              value: REGREX.password,
              message: MESSAGE.password.regex,
            },
            minLength: {
              value: 6,
              message: MESSAGE.password.length,
            },
          })}
          errors={errors?.password?.message || ""}
        />
        {/* End .form-group */}
        <div className="form-footer">
          <button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </button>
          {/* <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="signin-remember" />
            <label className="custom-control-label" htmlFor="signin-remember">
              Remember Me
            </label>
          </div> */}
          {/* End .custom-checkbox */}
          {/* <a href="#" className="forgot-link">
            Forgot Your Password?
          </a> */}
        </div>
        {/* End .form-footer */}
      </form>
      {/* End .form-choice */}
    </div>
  );
};

export default ModalLogin;
