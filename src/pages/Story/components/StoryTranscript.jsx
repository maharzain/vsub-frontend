import React, { useContext } from "react";
import { StoryContext } from "../index";
import AudioUpload from "../../../components/AudioUpload";
import TextArea from "../../../components/TextArea";

const StoryTranscript = () => {
  const { audioFile, setAudioFile, transcript, handleTranscriptChange } =
    useContext(StoryContext);

  const handleAudioUpload = (e) => {
    const file = e.target.files[0];
    const audioURL = URL.createObjectURL(file);
    if (file) {
      setAudioFile(audioURL);
    }
  };

  const handleRemoveAudio = () => {
    setAudioFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className='text-primary-font'>
      {!audioFile && (
        <div>
          <p>
            Transcript (Max 8000 characters) (Total {transcript.length}{" "}
            characters)
          </p>
          {/* story transcipt textera input */}
          <TextArea
            name='transcript' // Unique name for the transcript input
            id='transcript' // Unique id for the transcript input
            value={transcript} // Set the current value from the transcript object
            height='min-h-36' // Set the height of the textarea
            onChange={handleTranscriptChange} // Call handler to update transcript
          />
        </div>
      )}
      {/* Audio upload */}
      <AudioUpload
        label={false}
        audioFile={audioFile}
        handleAudioUpload={handleAudioUpload}
        handleRemoveAudio={handleRemoveAudio}
      />
    </div>
  );
};

export default StoryTranscript;
