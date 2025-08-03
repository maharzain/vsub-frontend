import React from "react";
import ColorPicker from "../../../components/ColorPicker";

const LevelSelector = ({
  level,
  levelMode,
  levelColor,
  handleLevelMode,
  handleColorChange,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <p className="w-16">{level}</p>
      <input
        type="text"
        placeholder={levelMode}
        value={levelMode}
        onChange={handleLevelMode}
        className="w-40 bg-transparent border-2 border-primary-border rounded-md px-3 py-[2px] hover:border-accentIndigo focus:border-accentIndigo focus:outline-none"
      />
      <ColorPicker
        bg={levelColor}
        fieldName="levelColor"
        handleColorChange={handleColorChange}
      />
    </div>
  );
};

export default LevelSelector;
