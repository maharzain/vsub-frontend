import { useContext, useState, useEffect } from "react";
import Notice from "../../../components/Notice";
import { IconInfoCircle, IconTrash } from "@tabler/icons-react";
import NumberTagInput from "../../../components/NumberTagInput";
import VideoUpload from "../components/VideoUpload";
import CheckBox from "../../../components/CheckBox";
import ReactPlayer from "react-player";
import { AnimatePresence, motion } from "framer-motion";
import { EditorContext } from "..";

const VideoTab = ({ settings, setSettings }) => {
  // State to track selected video
  const {subtitles, setSubtitles, edito} = useContext(EditorContext);
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);

  // Handle muting video
  const handleMute = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        [field]: value,
      },
    }));
  };

  // Handle start time of the video
  const handleStartFrom = (field, value) => {
    const floatValue = parseFloat(value) || 0;
    setSettings((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        [field]: floatValue,
      },
    }));
  };

  // Handle video upload and convert file to URL
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setSettings((prev) => ({
        ...prev,
        video: {
          ...prev.video,
          files: [...prev.video.files, videoURL], // Add video URL to array
        },
      }));
    }
    // e.target.value = null; // Reset file input to allow re-uploading same file
  };

  // Handle video deletion by index
  const handleRemoveVideo = (index) => {
    setSettings((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        files: prev.video.files.filter((_, i) => i !== index), // Remove video from array
      },
    }));
  };
  // Handle video selection
  const handleSelectVideo = (index) => {
    console.log(index);
    
    setSelectedVideoIndex(index);
    setSettings((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        selectedVideo: index, // Update selected video in settings
      },
    }));
  };

  // Set first video as selected by default
  useEffect(() => {
    if (settings.video.files.length > 0 && selectedVideoIndex === null) {
      setSelectedVideoIndex(0); // Select the first video
      setSettings((prev) => ({
        ...prev,
        video: {
          ...prev.video,
          selectedVideo: prev.video.files[0], // Update selected video in settings
        },
      }));
    }
  }, [settings.video.files, selectedVideoIndex, setSettings]);

  // Delete video and reset selection if necessary
  const handleDeleteVideo = (index) => {
    setSettings((prev) => ({
      ...prev,
      video: {
        ...prev.video,
        files: prev.video.files.filter((_, i) => i !== index),
      },
    }));
    if (selectedVideoIndex === index) {
      setSelectedVideoIndex(null); // Reset selected video if the deleted one was selected
    }
  };

  // Framer motion animation variants
  const container = {
    hidden: { opacity: 0 }, // Start hidden
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger the child animations
      },
    },
  };

  const item = {
    hidden: { x: -100, opacity: 0 }, // Slide in from left and start hidden
    show: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }, // Animate into position
    exit: { x: -100, opacity: 0, transition: { duration: 0.3 } }, // Slide out to left when removed
  };

  return (
    <div>
      <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
        <div className='flex items-center gap-3'>
          <IconInfoCircle size={50} style={{ color: "#1668DC" }} />
          It's better to upload and use your own background video for higher
          chance of getting viral and avoid unoriginal content when too many
          users use the same video. You can also buy unique gameplays in the
          Gamplay marketplace.
        </div>
      </Notice>

      <div className='mb-3' />
      <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
        You can reuse your gameplay, but don't use it more than three times. For
        better results, try changing the start time with the 'Start from' option
        each time you reuse it.
      </Notice>

      {/* Starts from Input */}
      <div className='flex flex-wrap items-center justify-between mt-5'>
        <div className='flex items-center gap-2'>
          <p className='flex items-center gap-2 text-primary-font'>
            Start from
            <IconInfoCircle size={20} style={{ color: "#fff" }} />
          </p>
          <NumberTagInput
            value={settings.video.startsFrom}
            onChange={(e) => {
              handleStartFrom("startsFrom", e.target.value);
            }}
          />
        </div>

        {/* Video Upload */}
        <VideoUpload
          videoFile={settings.video.files[0]}
          handleVideoUpload={handleVideoUpload}
          handleRemoveVideo={handleRemoveVideo}
        />
      </div>

      {/* Mute Video sound*/}
      <CheckBox
        label='Mute'
        fieldName='mute'
        checked={settings.video.mute}
        onChange={handleMute}
      />

      {/* Video Display with Selection and Delete functionality */}
      <motion.div
        className='flex gap-4 flex-wrap mt-5'
        variants={container}
        initial='hidden'
        animate='show'
      >
        {/* Wrap the video list in AnimatePresence */}
        <AnimatePresence>
          {settings.video.files.map((vidURL, idx) => (
            <motion.div
              key={vidURL} // Ensure the key is unique, ideally use vidURL or another unique identifier
              className={`relative cursor-pointer p-2 ${
                selectedVideoIndex === idx
                  ? "border-2 border-pink-500 rounded-md"
                  : ""
              }`}
              variants={item} // Apply the animation variants
              initial='hidden'
              animate='show'
              exit='exit' // Trigger exit animation when the item is removed
              onClick={() => handleSelectVideo(idx)}
            >
              {/* Video Player */}
              <ReactPlayer
                url={vidURL}
                light={false}
                playing={false}
                controls={false}
                width='150px'
                height='250px'
              />

              {/* Delete Icon */}
              <IconTrash
                size={20}
                className='absolute top-1 right-1 text-red-500 hover:text-red-700 cursor-pointer'
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering select on delete
                  handleDeleteVideo(idx);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default VideoTab;
