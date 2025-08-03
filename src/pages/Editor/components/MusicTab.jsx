import RangeSlider from "../../../components/RangeSlider";
import Notice from "../../../components/Notice";
import AudioUpload from "../../../components/AudioUpload";

const MusicTab = ({ settings, setSettings }) => {
  // functions for music tab
  // 'field' is the name of the volume setting (e.g., 'volume')
  // 'value' is the updated value for the specified field
  const handleMusicVolume = (field, value) => {
    setSettings((prev) => ({
      ...prev, // Spread the previous state to retain other settings
      music: {
        ...prev.music, // Spread the previous music settings to retain other fields
        [field]: value, // Update the specific field in the music object with the new value
      },
    }));
  };

  // Function to handle audio file upload for the music
  // It creates a URL for the uploaded audio file and stores it in the 'musicFile' field of the settings
  const handleMusicUpload = (e) => {
    const file = e.target.files[0]; // Get the uploaded file
    if (file) {
      const audioURL = URL.createObjectURL(file); // Create a URL from the uploaded audio file
      setSettings((prev) => ({
        ...prev, // Spread the previous state to retain other settings
        music: {
          ...prev.music, // Spread the previous music settings to retain other fields
          musicFile: audioURL, // Save the generated URL as 'musicFile'
        },
      }));
    }
  };

  // Function to remove the currently uploaded audio file
  // It sets 'musicFile' to null and clears the file input field
  const handleRemoveAudio = () => {
    setSettings((prev) => ({
      ...prev, // Spread the previous state to retain other settings
      music: {
        ...prev.music, // Spread the previous music settings to retain other fields
        musicFile: null, // Remove the music file by setting 'musicFile' to null
      },
    }));

    // Reset the file input field to allow re-uploading the same file if necessary
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className=''>
      <Notice bg={"bg-darkBlue"} borderColor={"border-lightBlue"}>
        When you upload videos to TikTok, it's best to add background music from
        Tiktlok's library. This helps you avoid copyright problems.
      </Notice>
      <div className='my-4' />
      {/* Volume */}
      <RangeSlider
        value={settings.music.volume}
        onChange={(e) => handleMusicVolume("volume", e.target.value)}
        min={0}
        max={100}
        label={"Volume"}
      />

      <AudioUpload
        label={false}
        audioFile={settings.music.musicFile}
        handleAudioUpload={handleMusicUpload}
        handleRemoveAudio={handleRemoveAudio}
      />
    </div>
  );
};

export default MusicTab;
