import React, { forwardRef } from "react";

const Input = forwardRef(({ label, required, errors, renderInput, className, ...rest }, ref) => {
  return (
    <div className={`form-group ${className && className}`}>
      <label className="label">
        {label} {required && <span>*</span>}
      </label>
      {renderInput?.({ ...rest, errors }) || (
        <input type="text" {...rest} className={`form-control  ${errors ? "input-error" : ""}`} ref={ref} />
      )}
      {errors && <p className="error">{errors}</p>}
    </div>
  );
});

export default Input;
