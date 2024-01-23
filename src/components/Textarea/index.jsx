import React, { forwardRef } from "react";

const Textarea = forwardRef(({ errors, ...rest }, ref) => {
  return (
    <>
      <textarea
        ref={ref}
        className={`form-control  ${errors ? "input-error" : ""}`}
        {...rest}
      />
      {errors && (
        <p className="error form-error" style={{ minHeight: 23 }}>
          {errors}
        </p>
      )}
    </>
  );
});

export default Textarea;
