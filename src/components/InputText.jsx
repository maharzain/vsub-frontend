import React from "react";

const InputText = ({
  value,
  size,
  name = "name",
  placeholder = "",
  onChange,
}) => { 
  return (
    <input
      type='text'
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${size} bg-transparent border-2 border-primary-border text-primary-font rounded-md px-3 py-[2px] hover:border-accentIndigo focus:border-accentIndigo focus:outline-none`}
    />
  );
};

export default InputText;
