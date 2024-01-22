import React from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/regex";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister } from "../../store/reducers/authReducer";
import useDebounce from "../../hooks/useDebounce";
import ComponentLoading from "../ComponentLoading";

const ModalRegister = ({ modalType }) => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const _onSubmit = async (data) => {
    if (data && !loading.register) {
      try {
        const { name, email, password } = data;
        const payload = {
          firstName: name || "",
          lastName: "",
          email,
          password,
        };
        dispatch(handleRegister(payload));
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  const renderLoading = useDebounce(loading.register, 300);
  // console.log("renderLoading", renderLoading);
  return (
    <div className="tab-pane fade show active" id="register">
      <form onSubmit={handleSubmit(_onSubmit)} style={{ position: "relative" }}>
        {renderLoading && <ComponentLoading />}

        <Input
          label="Your email address "
          placeholder="Your email address"
          type="email"
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
          label="Password"
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
            <span>SIGN UP</span>
            <i className="icon-long-arrow-right" />
          </button>
          {/* <div className="custom-control custom-checkbox">
            <input type="checkbox" className="custom-control-input" id="register-policy" required />
            <label className="custom-control-label" htmlFor="register-policy">
              I agree to the
              <Link to={PATHS.PRIVACY}>privacy policy</Link> *
            </label>
          </div> */}
          {/* End .custom-checkbox */}
        </div>
        {/* End .form-footer */}
      </form>
      {/* End .form-choice */}
    </div>
  );
};

export default ModalRegister;
