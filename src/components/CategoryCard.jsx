import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({
  image,
  heading,
  subHeading,
  title,
  newNiche = false,
  bestNiche = false,
}) => {
  const newChip = (
    <span
      style={{ borderRadius: "0.25rem", borderWidth: "0.5px" }}
      className='px-[6px] py-[1px] bg-darkGreen border-solid border-teal text-teal text-[0.8rem]'
    >
      new
    </span>
  );

  const bestNicheChip = (
    <div
      style={{ borderRadius: "0.25rem", borderWidth: "0.5px" }}
      className='px-[6px] py-[1px] bg-darkGreen border-solid border-green-600 text-green-600 text-[0.8rem]'
    >
      best
    </div>
  );

  return (
    <div className='bg-purple px-10 py-4 rounded-md flex flex-row items-center gap-5 border border-solid border-gray-700'>
      <img width={22} height={22} src={image} alt={heading} />
      <div className='flex flex-col gap-[6px] text-[0.9rem]'>
        <div className='flex flex-row items-center gap-2'>
          <h1 className='font-bold text-white'>{heading}</h1>
          {newNiche && newChip}
          {bestNiche && bestNicheChip}
        </div>
        <p className='text-dimGray-2'>{subHeading}</p>
      </div>
    </div>
  );
};

export default CategoryCard;
