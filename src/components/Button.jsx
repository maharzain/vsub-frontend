import React from "react";

const Button = ({ image, input, text, inputId, onClick, bg }) => {
  return (
    <div
      className={`flex items-center gap-2 border-2 py-1 px-4 ${bg} rounded-lg border-primary-border hover:border-[#7369DC] hover:cursor-pointer`}
      onClick={onClick}
    >
      {image && <img src={image}/>}
      {input && (
        <input
          type='text'
          name='search'
          id={inputId}
          className='bg-transparent focus:border-none focus:outline-none'
        />
      )}

      {text && text}
    </div>
  );
};

export default Button;
