import React from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { MESSAGE } from "../../constants/regex";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { handleChangePass } from "../../store/reducers/authReducer";

const ChangePass = () => {
  const dispatch = useDispatch();

  const { profile } = useSelector((state) => state.auth);
  const { firstName, phone, email, province, district, ward, street, birthday } =
    profile || {};
  const {
    form,
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      currentPass: "",
      newPass: "",
      confirmPass: "",
    },
  });
  const _onSubmit = (data) => {
    const payload = {
      firstName,
      phone,
      password: data?.currentPass,
      newPassword: data?.newPass,
    };

    dispatch(handleChangePass(payload));
    reset();
  };
  return (
    <div>
      <Input
        type="password"
        label="Current password (leave blank to leave unchanged)"
        required
        {...register("currentPass", {
          required: MESSAGE.require,
        })}
        errors={errors?.currentPass?.message || ""}
      />
      <Input
        type="password"
        label="New password (leave blank to leave unchanged)"
        {...register("newPass", {
          required: MESSAGE.require,
          minLength: 6,
        })}
        errors={errors?.newPass?.message || ""}
      />{" "}
      <Input
        type="password"
        label="Confirm new password"
        className="mb-2"
        {...register("confirmPass", {
          required: MESSAGE.require,
          validate: (value) =>
            value === watch("newPass") ? true : "Mật khẩu nhập lại không khớp",
        })}
        errors={errors?.confirmPass?.message || ""}
      />
      <Button onClick={handleSubmit(_onSubmit)}>
        <span>SAVE CHANGES</span>
        <i className="icon-long-arrow-right" />
      </Button>
    </div>
  );
};

export default ChangePass;
