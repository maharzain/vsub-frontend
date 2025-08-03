import React from "react";

const NumberTagInput = ({ value, onChange, tag = "ms" }) => {
  return (
    <div className='flex items-center'>
      <div className='border-2 border-r-0 border-primary-border rounded-l-md px-2 py-1'>
        <input
          type='number'
          name='characters'
          id={"sear"}
          placeholder='0'
          className='w-16 text-primary-font bg-transparent focus:outline-none focus:border-darkIndigo'
          value={value}
          onChange={onChange}
        />
      </div>
      <span className='text-primary-font bg-[#1E212B] border-2 border-primary-border px-3 rounded-r-md py-1'>
        {tag}
      </span>
    </div>
  );
};

export default NumberTagInput;
