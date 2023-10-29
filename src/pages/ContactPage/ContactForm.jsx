import React from "react";
import Input from "../../components/Input";
import { useForm } from "react-hook-form";
import { MESSAGE, REGREX } from "../../constants/regex";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  return (
    <div className="col-lg-6">
      <h2 className="title mb-1">Got Any Questions?</h2>
      <p className="mb-2">Use the form below to get in touch with the sales team</p>
      <form action="#" className="contact-form mb-3">
        <div className="row">
          <Input
            className="col-sm-6"
            placeholder="Name *"
            {...register("name", {
              required: MESSAGE.require,
            })}
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
          />
        </div>
        <div className="row">
          <Input
            className="col-sm-6"
            type="tel"
            placeholder="Phone"
            {...register("email", {
              required: MESSAGE.require,
              pattern: {
                value: REGREX.phone,
                message: MESSAGE.phone,
              },
            })}
          />

          <Input
            className="col-sm-6"
            type="tel"
            placeholder="Subject"
            {...register("email", {
              required: MESSAGE.require,
            })}
          />
        </div>
        <label htmlFor="cmessage" className="sr-only">
          Message
        </label>
        <textarea
          className="form-control"
          cols={30}
          rows={4}
          id="cmessage"
          required
          placeholder="Message *"
          defaultValue={""}
        />
        <button type="submit" className="btn btn-outline-primary-2 btn-minwidth-sm">
          <span>SUBMIT</span>
          <i className="icon-long-arrow-right" />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
