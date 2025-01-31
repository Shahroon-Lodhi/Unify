import React from "react";

const Dropdown = ({ label, value, onChange, options, required }) => {
  return (
    <label>
      {label}:
      <select value={value} onChange={onChange} required={required}>
        <option value="" disabled>
          Choose {label}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Dropdown;
