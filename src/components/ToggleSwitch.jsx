import React from "react";

const ToggleSwitch = ({ checked, onChange, text = false }) => {
  return (
    <label className="ml-4 inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={checked} // Use the global emphasize state
        onChange={onChange} // Function to call when the checkbox value changes
        className="peer sr-only"
      />
      <div className="peer relative h-6 w-11 rounded-full bg-[#374151] after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700">
        {text && <p className={`${checked ? "pl-5" : "pl-8"}`}>Stroke</p>}
      </div>
    </label>
  );
};

export default ToggleSwitch;
