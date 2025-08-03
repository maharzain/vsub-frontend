import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { storyTypes } from "../constants/index";
import DropDown from "./Dropdown";
import FilledButton from "./FilledButton";
import { IconUpload, IconX, IconInfoCircle } from "@tabler/icons-react";
import Notice from "./Notice";
import { StoryContext } from "../pages/Story/index";
import { AiVideoContext } from "../pages/AiVideo";
import VideoUpload from "./VideoUpload";

const ScriptGen = ({ isAiVideoPage }) => {
  const { storyType, videoFile, setVideoFile, setStoryType } = useContext(
    isAiVideoPage ? AiVideoContext : StoryContext
  );

  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file); // Create a URL from the file
      setVideoFile(videoURL); // Save the URL in state
    }
  };

  return (
    <div className='text-primary-font'>
      <p className='mb-2'>Type</p>

      <DropDown
        width={"w-52"}
        value={storyType}
        options={storyTypes}
        setOptionValue={setStoryType}
      />

      <p className='mt-6'>Start with a video file </p>
      <VideoUpload
        videoFile={videoFile}
        handleVideoUpload={handleVideoUpload}
        handleRemoveVideo={handleRemoveVideo}
        tiktokURL={true}
      />
      <div className='mt-6' />
      <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
        <div className='flex items-center gap-3'>
          <IconInfoCircle size={30} style={{ color: "#1668DC" }} />
          Provide an example of an already successful video from your selected
          niche for the the best possible result! You can also rewrite the
          script from the sample video.
        </div>
      </Notice>

      <div className='flex items-center gap-2 mt-4'>
        <FilledButton
          type='button'
          size='1.8rem'
          onClick={() => console.log("Splitting video")}
        >
          Generate
        </FilledButton>
        <p>(cost 20 credits)</p>
      </div>
    </div>
  );
};

export default ScriptGen;
