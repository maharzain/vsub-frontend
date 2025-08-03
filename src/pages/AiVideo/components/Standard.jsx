import React, { useRef, useContext } from "react";
import { motion } from "framer-motion";
import { AiVideoContext } from "../index";
import AudioUpload from "../../../components/AudioUpload";
import TextArea from "../../../components/TextArea";

const Standard = () => {
  const {
    audioFile,
    setAudioFile,
    transcript,
    setTranscript,
    handleAudioUpload,
  } = useContext(AiVideoContext);

  const fileInputRef = useRef(null);

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
      {!audioFile && (
        <div>
          <p>
            Transcript (Max 8000 characters) (Total {transcript.length}{" "}
            characters)
          </p>
          <TextArea
            name='transcript' // Unique name for the transcript input
            id='transcript' // Unique id for the transcript input
            value={transcript} // Set the current value from the transcript object
            height='min-h-52' // Set the height of the textarea
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 8000) {
                setTranscript(value);
              }
            }} // Call handler to update transcript
          />
        </div>
      )}

      <AudioUpload
        label={true}
        audioFile={audioFile}
        handleAudioUpload={handleAudioUpload}
        handleRemoveAudio={handleRemoveAudio}
      />
    </motion.div>
  );
};

export default Standard;
