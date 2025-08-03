import Notice from "../../../../components/Notice";
import RangeSlider from "../../../../components/RangeSlider";

const Settings = ({ settings, setSettings }) => {
  // Function to handle changes in the voice settings
  const handleVoiceChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      voice: {
        ...prev.voice,
        [field]: value,
      },
    }));
  };
  return (
    <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
      <input type='radio' name='my-accordion-4' />
      <div className='collapse-title text-lg text-primary-font font-medium'>
        Voice
      </div>
      <div className='collapse-content text-primary-font flex flex-col gap-4'>
        <Notice bg={"bg-[#2B2111]"} borderColor={"border-[#7a4d04]"}>
          Changing the volume to 100% or altering the voice pitch will only be
          applied during rendering. However, you can generate preview audio to
          test settings.
        </Notice>

        <RangeSlider
          value={settings.voice.voiceVolume}
          onChange={(e) => handleVoiceChange("voiceVolume", e.target.value)} // Extracting the value
          min={0}
          max={100}
          label='Voice Volume'
        />

        <RangeSlider
          value={settings.voice.voicePitch}
          onChange={(e) => handleVoiceChange("voicePitch", e.target.value)} // Extracting the value
          min={0}
          max={100}
          label='Voice Pitch'
        />
      </div>
    </div>
  );
};

export default Settings;
