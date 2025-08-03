import Title from "../../../components/Title";
import SubTitle from "../../../components/SubTitle";
import videoTypesImage from "../../../assets/images/niches.png";

const VideoTypes = () => {
  return (
    <div className="w-full text-center py-[2rem] sm:py-[4rem] flex flex-col items-center gap-1">
        <Title size={2.3} bold={true}>
          Create viral videos <span className="text-accentPink">10x faster</span>
        </Title>
        <SubTitle size={1.3}>Are you tired of spending hours on manually editing?</SubTitle>
        <img src={videoTypesImage} alt="Video Types" className="w-full mt-4 sm:mt-7 rounded-2xl" />
    </div>
  )
}

export default VideoTypes