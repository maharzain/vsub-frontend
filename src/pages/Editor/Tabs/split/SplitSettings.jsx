import React, { useState } from "react";
import RangeSlider from "../../../../components/RangeSlider";
import NumberTagInput from "../../../../components/NumberTagInput";
import CheckBox from "../../../../components/CheckBox";

const SplitSettings = ({ settings, setSettings }) => {
  const setting = settings.settings;
  const [revPo, setRevPo] = useState(false);

  const handleInputs = (field, value) => {
    setSettings((prev) => ({
      ...prev, // Spread the previous state to retain other settings
      settings: {
        ...prev.settings, // Spread the previous music settings to retain other fields
        [field]: value, // Update the specific field in the music object with the new value
      },
    }));
  };

  return (
    <div className='text-primary-font mt-3'>
      {/* block 1 */}
      <div>
        <p className='text-lg text-primary-font font-semibold'>Clipping</p>
        <p className='mt-4 mb-2'>Start from</p>

        <RangeSlider
          value={setting.startsFrom}
          min={0}
          max={25}
          onChange={(e) => handleInputs("startsFrom", e.target.value)}
        />
        {/* duration input */}
        <p className='mt-3 mb-2'>Duratiom</p>
        <NumberTagInput
          onChange={(e) => {
            handleInputs("duration", e.target.value);
          }}
          value={setting.duration}
          tag='s'
        />
      </div>

      {/* block 2  */}

      <div className='mt-4'>
        <p className='text-lg text-primary-font font-semibold'>Layout</p>
        <div>
          {/* Reverse position */}
          <CheckBox
            label='Reverse position'
            fieldName='reversePosition'
            checked={settings.reversePosition}
            onChange={handleInputs}
          />

          {/* Vertical split */}
          <CheckBox
            label='Vertical split'
            fieldName='verticalSplit'
            checked={settings.verticalSplit}
            onChange={handleInputs}
          />
        </div>
      </div>
    </div>
  );
};

export default SplitSettings;
