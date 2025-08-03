import { useContext, useRef } from "react";
import { IconUpload, IconX, IconInfoCircle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Notice from "../../../components/Notice";
import { fakeTextContext } from "../index";
import FilledButton from "../../../components/FilledButton";

const FakeTextScript = () => {
  const { videoFile, setVideoFile } = useContext(fakeTextContext);
  const fileInputRef = useRef(null);

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div>
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

      {/*  */}

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
        <div className='flex items-center gap-3'>
          <IconInfoCircle size={30} style={{ color: "#1668DC" }} />
          Provide an example of an already successful video. Vsub will generate
          a similar story.
        </div>
      </Notice>

      {videoFile && (
        <div className='mt-3 flex items-center gap-2'>
          <FilledButton size='2.2rem'>Generate</FilledButton>
          <p>(cost 20 credits)</p>
        </div>
      )}
    </div>
  );
};

export default FakeTextScript;
