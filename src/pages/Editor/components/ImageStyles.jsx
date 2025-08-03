import React from "react";
import NumberTagInput from "../../../components/NumberTagInput";
import CheckBox from "../../../components/CheckBox";
import ShadowStyles from "./ShadowStyles";

const ImageStyles = ({ settings, setSettings, objectName }) => {
  const handleColorChange = (newColor, name) => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        [name]: newColor.hex,
      },
    }));
  };

  const handleChanges = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        [name]: value,
      },
    }));
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* boolean to show images */}
      <CheckBox
        label='Show Images'
        fieldName='showImages'
        checked={settings[objectName].showImages}
        onChange={handleChanges}
      />

      <div className='flex flex-row flex-wrap gap-4 '>
        <NumberTagInput
          value={settings[objectName].imageRadius}
          onChange={(e) => {
            handleChanges("imageRadius", e.target.value);
          }}
          tag='Radius'
        />

        <NumberTagInput
          value={settings[objectName].imageWidth}
          onChange={(e) => {
            handleChanges("imageWidth", e.target.value);
          }}
          tag='Width%'
        />
      </div>

      {/* shadow styles */}

      <ShadowStyles
        objectName={objectName}
        settings={settings}
        setSettings={setSettings}
      />
    </div>
  );
};

export default ImageStyles;
