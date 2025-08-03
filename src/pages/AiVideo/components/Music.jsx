import React, { useContext } from "react";
import { motion } from "framer-motion";
import { AiVideoContext } from "../index";
import { IconAsterisk } from "@tabler/icons-react";
import AudioUpload from "../../../components/AudioUpload";
import TextArea from "../../../components/TextArea";

const Music = () => {
  const {
    audioFile,
    setAudioFile,
    transcript,
    setTranscript,
    handleAudioUpload,
  } = useContext(AiVideoContext);

  const handleRemoveAudio = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className='flex items-center mt-6 gap-[2px]'>
        <IconAsterisk size={10} style={{ color: "red" }} />
        <p>Audio</p>
      </div>

      <AudioUpload
        label={true}
        audioFile={audioFile}
        handleAudioUpload={handleAudioUpload}
        handleRemoveAudio={handleRemoveAudio}
      />

      <div className='flex items-center mt-6 gap-[2px] mb-4'>
        <IconAsterisk size={10} style={{ color: "red" }} />
        <p>
          Song lyrics (
          <span className='font-bold'>copy from generated song on Suno</span>)
        </p>
      </div>

      <TextArea
        name='transcript' // Unique name for the transcript input
        id='transcript' // Unique id for the transcript input
        value={transcript} // Set the current value from the transcript object
        height='min-h-52' // Set the height of the textarea
        onChange={(e) => setTranscript(e.target.value)} // Call handler to update transcript
      />
    </motion.div>
  );
};

export default Music;
