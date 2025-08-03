import React from "react";
import { IconTrash } from "@tabler/icons-react";
import InputText from "../../../components/InputText";

const Option = ({ option, onChange, isCorrect, setCorrectOption }) => {
  const handleRadioChange = () => {
    setCorrectOption(); // This will set this option as the correct one
  };

  const handleTextChange = (e) => {
    onChange({ ...option, text: e.target.value });
  };

  return (
    <label className='flex items-center cursor-pointer gap-3'>
      {/* Radio button */}
      <input
        type='radio'
        checked={isCorrect}
        onChange={handleRadioChange}
        className='hidden'
      />
      <span
        className={`relative w-5 h-5 rounded-full border-2 ${
          isCorrect
            ? "bg-darkIndigo border-darkIndigo"
            : "border-primary-border"
        } flex items-center justify-center`}
      >
        {isCorrect && (
          <span className='w-2.5 h-2.5 bg-white rounded-full'></span>
        )}
      </span>
      {/* Option text */}
      <InputText
        value={option.text}
        onChange={handleTextChange}
        size='w-56 h-8'
      />
    </label>
  );
};

export default Option;
