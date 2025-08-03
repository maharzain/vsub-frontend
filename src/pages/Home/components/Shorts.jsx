import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import InfiniteCarousel from "../../../components/InfiniteCarousel";
import { aiVideoTemplates } from "../../../constants";

const Shorts = () => {
  return (
    <div className="w-full text-center py-[2rem] sm:py-[4rem] flex flex-col items-center gap-1">
      <Title size={2.3} bold={true}>
        Generate <span className="text-accentPink">AI shorts</span> with one
        click
      </Title>
      <SubTitle size={1.3}>Multiple templates that fit every niches</SubTitle>
      <div className="w-full overflow-hidden mt-7">
        <InfiniteCarousel image={true} items={aiVideoTemplates} />
      </div>
    </div>
  );
};

export default Shorts;
