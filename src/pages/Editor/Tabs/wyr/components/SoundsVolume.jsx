import CheckBox from "../../../../../components/CheckBox";
import RangeSlider from "../../../../../components/RangeSlider"; // Fixed the typo

const SoundsVolume = ({
  checkBoxLabel,
  checkBoxname,
  rangeName,
  settings,
  setSettings,
}) => {
  const handleChanges = (valueName, value) => {
    setSettings((prev) => ({
      ...prev,
      sounds: {
        ...prev.sounds,
        [valueName]: value,
      },
    }));
  };

  return (
    <div>
      <CheckBox
        label={checkBoxLabel}
        fieldName={checkBoxname}
        checked={settings.sounds[checkBoxname]} // Use checked for checkbox
        onChange={handleChanges} // Pass checked value
      />
      <RangeSlider
        min={0}
        max={100}
        value={settings.sounds[rangeName]} // Ensure rangeName refers to a numeric value
        onChange={(e) => handleChanges(rangeName, e.target.value)} // Convert to number
      />
    </div>
  );
};

export default SoundsVolume;
