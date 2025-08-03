import React from "react";
import Title from "./Title";
import { IconCheck } from "@tabler/icons-react";

const PriceCard = ({ data, lifetime }) => {
  return (
    <div className="bg-lightPurple w-full lg:w-[21.5rem] lg:min-h-[35rem] lg:h-[35rem] px-7 py-9 rounded-3xl">
      <div className="flex flex-col gap-11">
        <div className="flex flex-col gap-3">
          <Title size={2} bold={false}>
            {data.title}
          </Title>
          {!lifetime ? (
            <div className="flex flex-row items-baseline">
              <Title size={2.8} bold={false}>
                {data.pricePerMonth}
              </Title>
              <Title size={2} bold={false}>/mo</Title>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Title size={2.8} bold={true}>
                {data.pricePerMonth}
              </Title>
              <span className="text-md text-white px-2 rounded-lg bg-[#14cd6c] w-[165px]">
                One Time Payment!
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <button
            className={`w-full btn min-h-[4.5rem] h-[4.5rem] px-[1.5rem] text-[1.4rem] font-normal rounded-[3.5rem] ${data.btnBgColor} text-white border-none`}
          >
            {data.btnText}
          </button>
          {lifetime && (
            <span className="text-red-500 font-bold">Only 100 available!</span>
          )}
        </div>
      </div>
      <hr className="border-t border-solid border-gray-700 my-6"></hr>
      <div className="flex flex-col gap-2 items-baseline">
        {data.perks.map((perk, index) => (
          <div key={index} className="flex gap-2">
            <IconCheck size={24} color="#27a65e" />
            {perk}
          </div>
        ))}
        {/* <div className="flex gap-2">
          <IconCheck size={24} color="#27a65e" />
          <p className="text-lg">5000 credits per month</p>
        </div>
        <div className="flex gap-2">
          <IconCheck size={24} color="#27a65e" />
          <p className="text-lg">5000 credits per month</p>
        </div>
        <div className="flex gap-2">
          <IconCheck size={24} color="#27a65e" />
          <p className="text-lg">5000 credits per month</p>
        </div> */}
      </div>
    </div>
  );
};

export default PriceCard;
