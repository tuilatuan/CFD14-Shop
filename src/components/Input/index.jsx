import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      required,
      name = "",
      errors,
      renderInput = undefined,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={`form-group ${className && className}`}>
        <label className="label" htmlFor={name}>
          {label} {required && <span>*</span>}
        </label>
        {renderInput?.({ rest, errors, ref }) || (
          <input
            type="text"
            {...rest}
            className={`form-control  ${!!errors ? "input-error" : ""}`}
            ref={ref}
            name={name}
            id={name}
          />
        )}
        {errors && (
          <p className="error form-error" style={{ minHeight: 23 }}>
            {errors || ""}
          </p>
        )}
      </div>
    );
  }
);

export default Input;
