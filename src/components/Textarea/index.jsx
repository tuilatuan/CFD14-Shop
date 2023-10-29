import React from "react";

const Textarea = ({ errors, ...rest }) => {
  return <textarea className={`form-control  ${errors ? "input-error" : ""}`} {...rest} />;
};

export default Textarea;
