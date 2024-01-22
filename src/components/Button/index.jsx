import React from "react";
import { Children } from "react";

const Button = ({ children, ...rest }) => {
  return (
    <button type="button" className="btn btn-outline-primary-2 " {...rest}>
      {/* <span className="btn-text">Place Order</span> */}
      {children}
    </button>
  );
};

export default Button;
