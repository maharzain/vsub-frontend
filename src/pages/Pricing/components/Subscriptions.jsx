import { useState } from "react";
import PriceCard from "../../../components/PriceCard";
import Title from "../../../components/Title";

const Subscriptions = () => {
  const [monthly, setMonthly] = useState(true);
  const [lifetime, setLifetime] = useState(false);

  const handleMonthlyOnclick = () => {
    setMonthly(true);
    setLifetime(false);
  };

  const handleLifetimeOnclick = () => {
    setMonthly(false);
    setLifetime(true);
  };

  const monthlySubscriptionData = [
    {
      title: "Starter",
      pricePerMonth: "$29",
      btnText: "Go Starter",
      btnBgColor: "bg-obsidian",
      perks: [
        <p key="1" className="text-lg text-dimGray-2">
          <span className="font-bold">5000</span> credits per month
        </p>,
        <p key="2" className="text-lg text-dimGray-2">
          $1 for <span className="font-bold">300</span> credits top up
        </p>,
        <p key="3" className="text-lg text-dimGray-2">
          Export videos up to <span className="font-bold">2</span> min.
        </p>,
      ],
    },
    {
      title: "Pro",
      pricePerMonth: "$49",
      btnText: "Go Pro",
      btnBgColor: "bg-accentPink-2",
      perks: [
        <p key="1" className="text-lg text-dimGray-2">
          <span className="font-bold text-accentPink-2">10000</span> credits per
          month
        </p>,
        <p key="2" className="text-lg text-dimGray-2">
          $1 for <span className="font-bold ">325</span> credits top up
        </p>,
        <p key="3" className="text-lg text-dimGray-2">
          Export videos up to{" "}
          <span className="font-bold text-accentPink-2">10</span> min.
        </p>,
      ],
    },
    {
      title: "Premium",
      pricePerMonth: "$99",
      btnText: "Go Premium",
      btnBgColor: "bg-darkGray",
      perks: [
        <p key="1" className="text-lg text-dimGray-2">
          <span className="font-bold">25000</span> credits per month
        </p>,
        <p key="2" className="text-lg text-dimGray-2">
          $1 for <span className="font-bold">350</span> credits top up
        </p>,
        <p key="3" className="text-lg text-dimGray-2">
          Export videos up to{" "}
          <span className="font-bold text-accentPink-2">10</span> min.
        </p>,
        <p key="4" className="text-lg text-dimGray-2">
          Team Collaboration
        </p>,
      ],
    },
  ];

  const lifetimeSubscriptionData = [
    {
      title: "Pro",
      pricePerMonth: "$490",
      btnText: "Go Pro",
      btnBgColor: "bg-darkGray",
      perks: [
        <p key="1" className="text-lg text-dimGray-2">
          <span className="font-bold text-accentPink-2">10000</span> credits per
          month
        </p>,
        <p key="2" className="text-lg text-dimGray-2">
          $1 for <span className="font-bold ">325</span> credits top up
        </p>,
        <p key="3" className="text-lg text-dimGray-2">
          Export videos up to{" "}
          <span className="font-bold text-accentPink-2">10</span> min.
        </p>,
      ],
    },
    {
      title: "Premium",
      pricePerMonth: "$990",
      btnText: "Go Premium",
      btnBgColor: "bg-accentPink-2",
      perks: [
        <p key="1" className="text-lg text-dimGray-2">
          <span className="font-bold">25000</span> credits per month
        </p>,
        <p key="2" className="text-lg text-dimGray-2">
          $1 for <span className="font-bold">350</span> credits top up
        </p>,
        <p key="3" className="text-lg text-dimGray-2">
          Export videos up to{" "}
          <span className="font-bold text-accentPink-2">10</span> min.
        </p>,
        <p key="4" className="text-lg text-dimGray-2">
          Team Collaboration
        </p>,
      ],
    },
  ];

  return (
    <div className="py-10">
      <div className="flex flex-col gap-4 items-center justify-center">
        <h3 className="text-dimGray-2 text-md">
          No hidden fees. Cancel anytime.
        </h3>
        <Title size={2.8} bold={false}>
          Your faceless channel factory
        </Title>
        <div className="flex flex-row items-center gap-5">
          <button
            onClick={handleMonthlyOnclick}
            className={`px-4 py-[0.35rem] rounded-3xl ${
              monthly
                ? "bg-accentPink-2"
                : "hover:text-accentPink-2 text-dimGray-2"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={handleLifetimeOnclick}
            className={`px-4 py-[0.35rem] rounded-3xl ${
              lifetime
                ? "bg-accentPink-2"
                : "hover:text-accentPink-2 text-dimGray-2"
            }`}
          >
            Lifetime
          </button>
        </div>

        {monthly && (
          <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5 mt-3">
            {monthlySubscriptionData.map((data, index) => (
              <PriceCard lifetime={false} key={index} data={data} />
            ))}
          </div>
        )}

        {lifetime && (
          <div className="flex flex-col items-center t-3 gap-3 mt-3">
            <div className="w-full lg:w-[55%]">
              <h3 className="text-md lg:text-xl text-dimGray text-center">
                <span className="font-bold">Lifetime access</span> for a
                one-time fee, available for a limited time! Sign up today and
                never pay any recurring fees. This deal is limited to just{" "}
                <span className="text-accentPink-2 font-bold">
                  200 licenses in total
                </span>
                .
              </h3>
              <p className="text-sm lg:text-md text-center mt-2">
                We are building many short video automation tools like{" "}
                <span className="font-bold">
                  Reddit story (completed), AI videos(beta), ChatGPT story,
                  would you rather video, fake text video,...
                </span>{" "}
                join our discord server to stay up to date!
              </p>
            </div>
            <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-5 mt-3">
              {lifetimeSubscriptionData.map((data, index) => (
                <PriceCard lifetime={true} key={index} data={data} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Subscriptions;
