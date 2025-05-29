import React from 'react';

const InputField = ({ type, placeholder, value, onChange, required = true }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="border p-2 w-full"
    />
  );
};

export default InputField;
