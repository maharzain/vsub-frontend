import React from "react";
import CarouselCard from "./CarouselCard";
import Notice from "./Notice";

const TemplatesBox = ({
  templateData,
  selectedTemplate,
  setSelectedTemplate,
  noticeText,
}) => {
  return (
    <div className='border-2 rounded-lg border-[#2B3040] p-6 relative'>
      <h2 className='text-lg font-semibold text-primary-font mb-2'>
        Templates
      </h2>
      <div className='absolute top-[70px] left-0 w-full border-b-2 border-[#2B3040] mb-6'></div>
      <div className="mt-10">
      {noticeText ? (
        <Notice bg={"bg-[#2B2111]"} borderColor={"border-[#7a4d04]"}>
          {noticeText}
        </Notice>
      ) : (
        ""
      )}
      </div>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2'>
        {templateData.map((template, index) => (
          <CarouselCard
            key={index}
            text={template.text}
            link={template.link}
            isTemplate={true}
            image={true}
            selectedTemplate={selectedTemplate}
            setSelectedTemplate={setSelectedTemplate}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesBox;
