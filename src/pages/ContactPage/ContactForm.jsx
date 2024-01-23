import React, { useEffect } from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/regex";
import Textarea from "../../components/Textarea";
import { subscribesService } from "../../services/subscribesService";
import useMutation from "../../hooks/useMutation";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      subject: "",
    },
  });
  const { data, error, loading, execute } = useMutation(
    subscribesService.subscribes
  );
  const _onSubmit = (dataSub) => {
    const { name, phone, email, subject, message } = dataSub || {};

    const payload = {
      name: name,
      phone: phone,
      email: email,
      description: message,
      title: subject,
    };

    execute?.(payload, {
      onSuccess: (data) => {
        console.log("dataSuccess :>> ", data);
      },
      onFail: (error) => {
        console.log("error :>> ", error);
      },
    });
  };

  return (
    <div className="col-lg-6">
      <h2 className="title mb-1">Got Any Questions?</h2>
      <p className="mb-2">Use the form below to get in touch with the sales team</p>
      <form className="contact-form mb-3">
        <div className="row">
          <Input
            className="col-sm-6"
            placeholder="Name *"
            {...register("name", {
              required: MESSAGE.require,
            })}
            errors={errors?.name?.message || ""}
          />
          <Input
            className="col-sm-6"
            type="email"
            placeholder="Email *"
            {...register("email", {
              required: MESSAGE.require,
              pattern: {
                value: REGREX.email,
                message: MESSAGE.email,
              },
            })}
            errors={errors?.email?.message || ""}
          />
        </div>
        <div className="row">
          <Input
            className="col-sm-6"
            type="tel"
            placeholder="Phone"
            {...register("phone", {
              required: MESSAGE.require,
              pattern: {
                value: REGREX.phone,
                message: MESSAGE.phone,
              },
            })}
            errors={errors?.phone?.message || ""}
          />

          <Input
            className="col-sm-6"
            type="text"
            placeholder="Subject"
            {...register("subject", {
              required: MESSAGE.require,
            })}
            errors={errors?.subject?.message || ""}
          />
        </div>

        <Input
          type="text"
          renderInput={(inputProps) => {
            return (
              <Textarea
                {...inputProps}
                {...register("message", { require: MESSAGE.require })}
                className="form-control"
                cols={30}
                rows={4}
                placeholder="Message *"
                errors={errors?.message?.message || ""}
              />
            );
          }}
        />
        <button onClick={handleSubmit(_onSubmit)} className="btn-minwidth-sm">
          <span>SUBMIT</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
