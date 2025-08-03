import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import autoCaptionImg from "../../../assets/images/auto-captions.png";

const AutoCaptions = () => {
  return (
    <div className="w-full text-center py-[2rem] sm:py-[4rem] flex flex-col items-center gap-1">
      <Title size={2.3} bold={true}>
        Auto captions with <span className="text-accentPink">animated emojis</span>
      </Title>
      <SubTitle size={1.3}>Create perfect captions to keep users engaged.</SubTitle>
      <img className="mt-6 rounded-2xl"  src={autoCaptionImg} />
    </div>
  );
};

export default AutoCaptions;
