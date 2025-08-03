import React from "react";

const CheckBox = ({ label, checked, fieldName, onChange }) => {
  return (
    <div className='flex flex-row items-center gap-3'>
      <label className='inline-flex label cursor-pointer text-primary-font gap-3'>
        {label}
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => {
            onChange(fieldName, e.target.checked);
          }}
          className='checkbox checkbox-sm checkbox-primary mr-2'
        />
      </label>
    </div>
  );
};

export default CheckBox;
