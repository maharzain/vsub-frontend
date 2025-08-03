import React from "react";

const BorderContainer = ({ children }) => {
  return (
    <div className='inline-flex flex-wrap gap-6 border border-primary-border rounded-lg px-5 py-4'>
      {children}
    </div>
  );
};

export default BorderContainer;