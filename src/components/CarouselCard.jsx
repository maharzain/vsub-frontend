import React from "react";

const CarouselCard = ({
  text,
  link,
  image,
  isTemplate,
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const setTemplate = () => {
    // Trim the text before saving it to the state
    const trimmedText = text;
    setSelectedTemplate(text);
  };
  return (
    <div
      className={`min-w-[12.5rem] max-w-full text-left rounded-md ${
        selectedTemplate === text ? "border-[3px] border-pink-800" : ""
      } ${isTemplate ? "relative" : ""} hover:cursor-pointer`}
      onClick={setTemplate}
    >
      {!image && (
        <video
          className='min-w-[12.5rem]'
          playsInline
          muted
          autoPlay
          loop
          src={link}
        ></video>
      )}
      {image && (
        <img
          className='min-w-[12.5rem] rounded-md'
          src={link}
          alt={text}
          data-value={text}
        />
      )}
      <h1
        className={`bg-transparent-black text-white px-2 py-1 text-base ${
          isTemplate ? "absolute bottom-0 w-full rounded-b-md" : ""
        }`}
      >
        {text}
      </h1>
    </div>
  );
};

export default CarouselCard;
