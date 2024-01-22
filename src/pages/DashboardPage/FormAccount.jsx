import React, { useEffect } from "react";
import Input from "../../components/Input";
import { Controller, useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/regex";
import { Select } from "antd";
import { formatDate, removeAccents } from "../../utils/format";
import useAddress from "../../hooks/useAddress";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { handleUpdateProfile } from "../../store/reducers/authReducer";
import { formatDateString } from "../../utils/calculate";

const FormAccount = ({ profile }) => {
  const dispatch = useDispatch();
  const { firstName, phone, email, province, district, ward, street, birthday } =
    profile || {};
  const birthdayFormat = formatDate(birthday);
  const {
    provinces,
    districts,
    wards,
    provinceId,
    districtId,
    wardId,
    handleDistricChange,
    handleWardChange,
    handleProvinceChange,
  } = useAddress();

  const {
    form,
    register,
    handleSubmit,
    reset,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName,
      email,
      phone,
      birthdayFormat,
      province,
      district,
      ward,
      street,
    },
  });
  useEffect(() => {
    if (!profile) return;
    reset?.({
      firstName,
      phone,
      email,
      birthdayFormat,
      province,
      district,
      ward,
      street,
    });
    handleProvinceChange?.(province);
    handleDistricChange?.(district);
    handleWardChange?.(ward);
  }, [profile]);
  const _onProvinceChange = (changeId) => {
    handleProvinceChange?.(changeId);
    reset({
      ...getValues(),
      province: changeId,
      district: undefined,
      ward: undefined,
    });
  };

  const _onDistrictChange = (changeId) => {
    handleDistricChange?.(changeId);
    reset({
      ...getValues(),
      district: changeId,
      ward: undefined,
    });
  };
  const _onWardChange = (changeId) => {
    handleWardChange?.(changeId);
    reset({
      ...getValues(),
      ward: changeId,
    });
  };
  const _onSubmit = (data, e) => {
    e?.preventDefault();

    dispatch(
      handleUpdateProfile({
        ...data,
        province: provinces?.find((item) => item.value === provinceId),
        district: districts?.find((item) => item.value === districtId),
        ward: wards?.find((item) => item.value === wardId),
      })
    );
  };
  return (
    <div
      className="tab-pane fade show active"
      id="tab-account"
      role="tabpanel"
      aria-labelledby="tab-account-link"
    >
      <form className="account-form">
        <div className="row">
          <div className="col-sm-6">
            <Input
              label="Full Name"
              required
              type="text"
              {...register("firstName", {
                required: MESSAGE.require,
              })}
              errors={errors?.firstName?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="email"
              required
              disabled
              label="Email address"
              {...register("email", {
                required: MESSAGE.require,
                pattern: REGREX.email,
              })}
              errors={errors?.email?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Input
              type="text"
              required
              label="Phone number"
              {...register("phone", {
                required: MESSAGE.require,
                pattern: REGREX.phone,
              })}
              errors={errors?.phone?.message || ""}
            />
          </div>
          <div className="col-sm-6">
            <Input
              type="date"
              required
              label="Ngày sinh"
              value={birthdayFormat}
              {...register("birthday", {
                required: MESSAGE.require,
              })}
              errors={errors?.birthday?.message || ""}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-4">
            <label>Province/City *</label>
            <Controller
              name="province"
              control={control}
              rules={{ required: MESSAGE.require }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-control form-select"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Provice/City"
                      options={provinces}
                      value={provinceId}
                      optionFilterProp="children"
                      onChange={_onProvinceChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.province?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>District/Town *</label>
            <Controller
              name="district"
              control={control}
              rules={{ required: MESSAGE.require }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-select form-control"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select District/Town"
                      options={districts}
                      value={districtId}
                      optionFilterProp="children"
                      onChange={_onDistrictChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.district?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
          <div className="col-sm-4">
            <label>Ward *</label>
            <Controller
              name="ward"
              control={control}
              rules={{ required: MESSAGE.require }}
              render={({ formState: { errors } }) => {
                return (
                  <>
                    <Select
                      className="form-select form-control"
                      suffixIcon={<></>}
                      showSearch
                      placeholder="Please select Ward"
                      options={wards}
                      value={wardId}
                      optionFilterProp="children"
                      onChange={_onWardChange}
                      filterOption={(input, option) =>
                        removeAccents(option?.label ?? "")
                          .toLowerCase()
                          .includes(removeAccents(input.toLowerCase()))
                      }
                    />
                    <p className="form-error" style={{ minHeight: 23 }}>
                      {errors?.ward?.message || ""}
                    </p>
                  </>
                );
              }}
            />
          </div>
        </div>

        <Input
          type="text"
          required
          label="Street address "
          {...register("street", {
            required: MESSAGE.require,
          })}
          errors={errors?.street?.message || ""}
        />

        <Button onClick={handleSubmit(_onSubmit)}>SAVE CHANGES</Button>
      </form>
    </div>
  );
};

export default FormAccount;
