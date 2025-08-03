import React from "react";

const RangeSlider = ({ value, onChange, min = 0, max = 100, label , width }) => {
  return (
    <div>
      <label
        htmlFor='default-range'
        className='block mb-2 text-md font-medium text-primary-font dark:text-primary-font'
      >
        {label}
      </label>

      <div className='flex items-center gap-2'>
        <input
          id='default-range'
          type='range'
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          className={`${
            width ? width : "w-full md:w-1/3"
          } h-2 bg-[#31343F] rounded-lg appearance-none cursor-pointer dark:bg-[#31343F]`}
        />

        <span className="text-primary-font">{value}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
