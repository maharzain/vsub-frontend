import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import FilledButton from "../../../components/FilledButton";
import { IconArrowRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const AutomationTools = () => {
  return (
    <div className="mx-auto flex w-[90%] flex-col items-center gap-4 py-[2rem] text-center sm:w-[80%] sm:py-[4rem] md:w-[80%] xl:w-[60%]">
      <Title size={2.3} bold={true}>
        We are building many short video{" "}
        <span className="text-accentPink">automation tools</span>
      </Title>
      <SubTitle size={1.3}>
        <span className="font-bold">
          Reddit story (completed), AI videos(beta), ChatGPT story, would you
          rather video, fake text video,...
        </span>{" "}
        join our{" "}
        <a
          style={{ textDecoration: "underline" }}
          href="https://discord.gg/rvd4Hayeay"
        >
          discord server
        </a>{" "}
        to stay up to date!
      </SubTitle>
      <div className="my-2"></div>
      <Link to="/login" className="cursor-pointer">
        <FilledButton>
          Get Started
          <IconArrowRight size={20} />
        </FilledButton>
      </Link>
    </div>
  );
};

export default AutomationTools;
