import React from "react";

const FilledButton = ({ children, onClick, type, size , proceed , bgColor }) => {
  return (
    <button
      style={{
        minHeight: size ? size : "2.6rem",
        height: size ? size : "2.6rem",
      }}
      disabled={proceed !== undefined ? !proceed : false}
      type={type}
      onClick={onClick}
      className={`btn flex items-center py-1 px-2 ${bgColor ? bgColor : "bg-darkIndigo hover:bg-accentIndigo"} border-none  text-dimGray font-normal rounded-md disabled:text-btn-disabled-text disabled:bg-btn-disabled`}
    >
      {children}
    </button>
  );
};

export default FilledButton;
