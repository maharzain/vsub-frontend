import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { storyTypes } from "../../../constants";
import DropDown from "../../../components/Dropdown";
import FilledButton from "../../../components/FilledButton";
import { IconUpload, IconX, IconInfoCircle } from "@tabler/icons-react";
import Notice from "../../../components/Notice";
import { StoryContext } from "../index";

const StoryScript = () => {
  const fileInputRef = useRef(null);
  const {
    storyType,
    videoFile,
    setVideoFile,
    setStoryType,
    handleVideoUpload,
  } = useContext(StoryContext);

  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
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

      <p className='mt-3'>Start with a video file </p>
      {!videoFile && (
        <div className='mb-4'>
          <input
            type='file'
            accept='video/*'
            id='video-upload'
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleVideoUpload}
          />
          <div className='flex items-center gap-4 mt-3'>
            <label
              htmlFor='video-upload'
              style={{ minHeight: "1.8rem", height: "1.8rem" }}
              className='btn bg-purpleBlack hover:bg-purpleBlack hover:border-accentIndigo hover:text-accentIndigo border-[0.5px] border-darkIndigo text-darkIndigo text-[1rem] sm:text-base font-normal rounded-md'
            >
              <IconUpload size={20} />
              <span>Upload video</span>
            </label>
            <Link to='https://snaptik.app/en1'>
              <span className='text-glowBlue hover:text-blue-400'>
                Download TikTok video
              </span>
            </Link>
          </div>
        </div>
      )}

      {/* video chip */}

      {videoFile && (
        <div className='my-4 inline-flex items-center space-x-2 bg-purpleGray text-primary-font py-0 px-3 rounded-md'>
          <span>video.{videoFile.name.split(".").pop()}</span>
          <IconX
            size={20}
            className='cursor-pointer'
            onClick={handleRemoveVideo}
          />
        </div>
      )}

      <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
        <div className='flex items-center gap-2'>
          <IconInfoCircle size={20} style={{ color: "#1668DC" }} />
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

export default StoryScript;
