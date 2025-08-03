import { useRef } from "react";
import { IconUpload, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const VideoUpload = ({
  videoFile,
  handleVideoUpload,
  handleRemoveVideo,
  tiktokURL,
}) => {
  const fileInputRef = useRef(null);
  return (
    <div>
      {!videoFile && (
        <div>
          <input
            type='file'
            accept='video/*'
            id='video-upload'
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleVideoUpload}
          />
          <div className='flex flex-col items-left sm:flex-row sm:items-center gap-4 mt-3'>
            <label
              htmlFor='video-upload'
              style={{ minHeight: "1.8rem", height: "1.8rem" }}
              className='btn bg-purpleBlack hover:bg-purpleBlack hover:border-accentIndigo hover:text-accentIndigo border-[0.5px] border-darkIndigo text-darkIndigo text-[1rem] sm:text-base font-normal rounded-md'
            >
              <IconUpload size={20} />
              <span>Upload video</span>
            </label>
            {tiktokURL ? (
              <Link to='https://snaptik.app/en1'>
                <span className='text-glowBlue hover:text-blue-400'>
                  Download TikTok video
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      )}

      {videoFile && (
        <div className='my-4 inline-flex items-center space-x-2 bg-purpleGray text-primary-font py-0 px-3 rounded-md'>
          <span>video.mp4</span>
          <IconX
            size={20}
            className='cursor-pointer'
            onClick={handleRemoveVideo}
          />
        </div>
      )}
    </div>
  );
};

export default VideoUpload;
