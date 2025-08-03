import { useRef, useContext } from "react";
import VideoUpload from "../../../components/VideoUpload";
import { SplitContext } from "../index";

const SplitVideo = () => {
  const { videoFile, setVideoFile } = useContext(SplitContext);
  const fileInputRef = useRef(null);

  // Handle video upload
  const handleVideoUpload = (event) => {
    const file = event.target.files[0]; // Get the first uploaded file
    if (file) {
      setVideoFile(file); // Save the actual File object in state
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
      <h2 className='text-primary-font'>
        {videoFile ? "Continue" : "Start"} with a video file
      </h2>
      <VideoUpload
        videoFile={videoFile}
        handleVideoUpload={handleVideoUpload}
        handleRemoveVideo={handleRemoveVideo}
        tiktokURL={false}
      />
    </div>
  );
};

export default SplitVideo;