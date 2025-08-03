import React from "react";

const RadioSelection = ({ option, setOption, optionOne, optionTwo }) => {
  const handleRadioChange = (e) => {
    setOption(e.target.value);
  };

  return (
    <div className='flex gap-4 my-4'>
      <label className='flex flex-row items-center hover:cursor-pointer'>
        <input
          type='radio'
          value={optionOne}
          checked={option === optionOne}
          onChange={handleRadioChange}
          className='hidden'
        />
        <span
          className={`relative w-5 h-5 rounded-full border-2 ${
            option === optionOne
              ? "bg-darkIndigo border-darkIndigo"
              : "border-primary-border"
          } flex justify-center items-center`}
        >
          {option === optionOne && (
            <span className='w-2.5 h-2.5 bg-white rounded-full'></span>
          )}
        </span>
        <span className='ml-2'>{optionOne}</span>
      </label>

      <label className='flex flex-row items-center hover:cursor-pointer'>
        <input
          type='radio'
          value={optionTwo}
          checked={option === optionTwo}
          onChange={handleRadioChange}
          className='hidden'
        />
        <span
          className={`relative w-5 h-5 rounded-full border-2 ${
            option === optionTwo
              ? "bg-darkIndigo border-darkIndigo"
              : "border-primary-border"
          } flex justify-center items-center`}
        >
          {option === optionTwo && (
            <span className='w-2.5 h-2.5 bg-white rounded-full'></span>
          )}
        </span>
        <span className='ml-2'>{optionTwo}</span>
      </label>
    </div>
  );
};

export default RadioSelection;
