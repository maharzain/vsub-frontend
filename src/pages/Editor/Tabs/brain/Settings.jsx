import Notice from "../../../../components/Notice";
import RangeSlider from "../../../../components/RangeSlider";
import NumberTagInput from "../../../../components/NumberTagInput";
import TextStyles from "../../components/TextStyles";
import Dropdown from "../../../../components/Dropdown";
import { useEffect, useState } from "react";
import LevelSelector from "./components/LevelSelector";

const Settings = ({ settings, setSettings }) => {
  const [soundName, setsoundName] = useState(settings.timer.soundName);

  const handleVoiceChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      voice: {
        ...prev.voice,
        [field]: value,
      },
    }));
  };

  // Timer Tab Functions
  const handleTimer = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        soundName: soundName,
      },
    }));
  }, [soundName]);

  // Layout Tab Functions
  const handleLayoutChanges = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [name]: value,
      },
    }));
  };

  //Levels Tab Functions

  // Function to handle level mode change
  const handleLevelModeChange = (index, e) => {
    const newLevels = [...settings.levels.levels];
    newLevels[index].levelMode = e.target.value;

    setSettings((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        levels: newLevels,
      },
    }));
  };

  // Function to handle level color change
  const handleColorChange = (newColor, fieldName, index) => {
    const newLevels = [...settings.levels.levels];
    newLevels[index][fieldName] = newColor.hex;

    setSettings((prev) => ({
      ...prev,
      levels: {
        ...prev.levels,
        levels: newLevels,
      },
    }));
  };

  return (
    <div className='join join-vertical w-full gap-4'>
      {/*Voice Settings */}
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
            value={settings.voice.voiceSpeed}
            onChange={(e) => handleVoiceChange("voiceSpeed", e.target.value)} // Extracting the value
            min={0}
            max={100}
            label='Voice Speed'
          />

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

      {/* Levels Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Levels
        </div>
        <div className='collapse-content text-primary-font'>
          {/* level colors here */}
          <div className='flex flex-col items-start justify-between gap-6 mb-6'>
            {settings.levels.levels.map((level, index) => (
              <LevelSelector
                key={index}
                level={level.level}
                levelMode={level.levelMode}
                levelColor={level.levelColor}
                handleLevelMode={(e) => handleLevelModeChange(index, e)}
                handleColorChange={(color) =>
                  handleColorChange(color, "levelColor", index)
                }
              />
            ))}
          </div>

          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='levels' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Timer Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Timer
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <Dropdown
            width={"w-52"}
            value={soundName}
            options={["Sound One", "Sound Two"]}
            setOptionValue={setsoundName}
          />
          <div className='flex flex-wrap items-center gap-4 mb-6'>
            <p className='text-primary-font'>Duration</p>
            <NumberTagInput
              value={settings.timer.duration}
              onChange={(e) => handleTimer("duration", e.target.value)}
              tag='ms'
            />
          </div>
        </div>
      </div>

      {/* Layout Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Layout
        </div>
        <div className='collapse-content text-primary-font flex flex-row flex-wrap gap-6'>
          {/* PaddingTOP */}
          <NumberTagInput
            value={settings.layout.paddingTop}
            onChange={(e) => handleLayoutChanges("paddingTop", e.target.value)}
            tag='Padding Top'
          />
          {/* PaddingX */}
          <NumberTagInput
            value={settings.layout.paddingX}
            onChange={(e) => handleLayoutChanges("paddingX", e.target.value)}
            tag='Padding X'
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
