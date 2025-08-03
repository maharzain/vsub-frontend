import React from "react";

const BorderBox = ({children}) => {
  return (
    <div className="border-2 rounded-lg border-[#2B3040] p-6">
     {children}
    </div>
  );
};

export default BorderBox;
