import React from "react";
import FilledButton from "../../../components/FilledButton";
import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import InfiniteCarousel from "../../../components/InfiniteCarousel";
import { carouselItems } from "../../../constants";

import avatar1 from "../../../assets/images/2.jpeg";
import avatar2 from "../../../assets/images/3.jpeg";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="py-[2.5rem] sm:py-[4.5rem] w-full">
      <div className="w-full text-center mb-[2rem] sm:mb-[4rem] flex flex-col items-center gap-4">
        <Title size={2.7} bold={false}>
          Create <span className="text-accentPink">faceless videos</span> in
          seconds with AI
        </Title>
        <SubTitle size={1.5}>
          All-in-one solution for your faceless channel!
        </SubTitle>
        <div className="flex flex-col-reverse sm:flex-row items-center gap-5 sm:gap-3 mt-1">
          <FilledButton>
          <Link to="/login">Get Started</Link>
          </FilledButton>
          <div className="flex flex-row items-center w-full gap-3">
            <div className="flex flex-row">
              <img className="w-[32px] rounded-full" src={avatar1} />
              <img className="w-[32px] rounded-full z-10 -ml-1" src={avatar2} />
            </div>
            <h3 className="text-dimGray-2">
              <span className="font-bold">50,000+</span> Creators
            </h3>
          </div>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <InfiniteCarousel image={false} items={carouselItems} />
      </div>
    </div>
  );
};

export default Hero;
