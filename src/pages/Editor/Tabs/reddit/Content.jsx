import AudioUpload from "../../../../components/AudioUpload";
import CheckBox from "../../../../components/CheckBox";
import FilledButton from "../../../../components/FilledButton";
import DropDown from "../../../../components/Dropdown";
import NumberTagInput from "../../../../components/NumberTagInput";
import PostData from "./PostData";
import { useEffect, useState } from "react";

const Content = ({ settings, setSettings, redditPost, setRedditPost }) => {
  const content = settings.content;

  const [voiceName, setVoiceName] = useState(content.voiceName);
  // effect to set value of voiceName
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        voiceName: voiceName,
      },
    }));
  }, [voiceName]);

  // 'field' is the name of the volume setting (e.g., 'volume')
  // 'value' is the updated value for the specified field
  const handleInput = (field, value) => {
    setSettings((prev) => ({
      ...prev, // Spread the previous state to retain other settings
      content: {
        ...prev.content, // Spread the previous content settings to retain other fields
        [field]: value, // Update the specific field in the content object with the new value
      },
    }));
  };

  // Function to handle audio file
  // It creates a URL for the uploaded audio file and stores it in the 'audioFile' field of the settings
  const handleAudioUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const audioURL = URL.createObjectURL(file); // Create a URL from the uploaded audio file
      setSettings((prev) => ({
        ...prev, // Spread the previous state to retain other settings
        content: {
          ...prev.content, // Spread the previous content settings to retain other fields
          audioFile: audioURL, // Save the generated URL as 'audioFile'
        },
      }));
    }
  };

  // Function to remove the currently uploaded audio file
  // It sets 'audioFile' to null and clears the file input field
  const handleRemoveAudio = () => {
    setSettings((prev) => ({
      ...prev, // Spread the previous state to retain other settings
      content: {
        ...prev.content, // Spread the previous content settings to retain other fields
        audioFile: null, // Remove the audio file by setting 'audioFile' to null
      },
    }));
  };

  return (
    <div className='text-primary-font'>
      <p className='font-extrabold text-white text-lg'>Settings</p>
      <div className='py-4'>
        <CheckBox
          label='Show Comments Images'
          checked={content.commentImages}
          fieldName={"commentImages"}
          onChange={handleInput}
        />
        <CheckBox
          label='Disable Captions'
          checked={content.captions}
          fieldName={"captions"}
          onChange={handleInput}
        />
      </div>
      <p className='font-bold'>Voice Settings</p>
      <div className='flex flex-col flex-wrap gap-3 py-4'>
        {/* dropdown for voice name*/}
        <DropDown
          width={"w-64"}
          value={voiceName}
          options={["Mathew, Male, US English", "John, Male, US English"]}
          setOptionValue={setVoiceName}
        />

        <span className='flex flex-wrap items-center gap-3'>
          <p>Speed</p>
          <NumberTagInput
            tag='%'
            value={content.voiceSpeed}
            onChange={(e) => {
              handleInput("voiceSpeed", e.target.value);
            }}
          />
        </span>
        <p>
          You must hit "regenerate speech" after changing the voice settings or
          post content.
        </p>
        <span className='flex flex-wrap items-center gap-4'>
          <FilledButton size='2rem'>Regenerate Speech</FilledButton>
          <p>(total 1437 characters)</p>
        </span>
        <AudioUpload
          title='Replace audio'
          label={false}
          audioFile={content.audioFile}
          handleAudioUpload={handleAudioUpload}
          handleRemoveAudio={handleRemoveAudio}
        />
        {/* reddit post data */}
        <PostData redditPost={redditPost} setRedditPost={setRedditPost} />
      </div>
    </div>
  );
};

export default Content;
