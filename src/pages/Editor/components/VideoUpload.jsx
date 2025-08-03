import { IconUpload } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const VideoUpload = ({ handleVideoUpload }) => {
  return (
    <div>
      {
        <div>
          <input
            type='file'
            accept='video/*'
            id='video-upload'
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
          </div>
        </div>
      }
    </div>
  );
};

export default VideoUpload;
