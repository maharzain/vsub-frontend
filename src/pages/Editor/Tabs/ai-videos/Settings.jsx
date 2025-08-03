import Notice from "../../../../components/Notice";
import RangeSlider from "../../../../components/RangeSlider";
import CheckBox from "../../../../components/CheckBox";
import DropDown from "../../../../components/Dropdown";
import { useState, useEffect } from "react";

const Settings = ({ settings, setSettings }) => {
  const [transition, setTransition] = useState(settings.effects.transition);
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
  //effects functions
  const handleCheckBox = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      effects: {
        ...prev.effects,
        transition: transition,
      },
    }));
  }, [transition]);

  return (
    <div className='flex flex-col gap-4'>
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

      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Effects
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-4'>
          <CheckBox
            label='Particles Background'
            fieldName='particlesBg'
            checked={settings.effects.particlesBg}
            onChange={handleCheckBox}
          />

          <div className='inline-flex flex-wrap items-center gap-4 pb-24 mt-4'>
            <p className='text-primary-font'>Transition</p>
            <DropDown
              width={"w-44"}
              value={transition}
              options={["Smooth", "Strong Swipe"]}
              setOptionValue={setTransition}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
