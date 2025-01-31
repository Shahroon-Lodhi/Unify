import React from "react";

const TextInput = ({ label, type = "text", value, onChange, required }) => {
  return (
    <label>
      {label}:
      <input 
        type={type} 
        value={value} 
        onChange={onChange} 
        required={required} 
      />
    </label>
  );
};

export default TextInput;
