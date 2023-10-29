import React from "react";

const Select = ({ label, className, value, defaultValue, options, ...rest }) => {
  return (
    <div className={className ? className : ""}>
      <label htmlFor="sortby">{label}</label>
      <div className="select-custom">
        <select
          {...rest}
          value={value}
          name="sortby"
          id="sortby"
          className="form-control"
        >
          {options?.map((option, index) => (
            <option key={option?.value || index} value={option?.value}>
              {option?.label || ""}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Select;
