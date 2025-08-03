import CheckBox from "../../../../components/CheckBox";
import { motion, AnimatePresence } from "framer-motion";
import ColorPicker from "../../components/ColorPicker";
import NumberTagInput from "../../../../components/NumberTagInput";

const StrokeStyles = ({ settings, setSettings, objectName, subObject }) => {
  const handleColorChange = (newColor, name) => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        [subObject]: {
          ...prev[objectName][subObject],
          [name]: newColor.hex,
        },
      },
    }));
  };

  const handleChanges = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        [subObject]: {
          ...prev[objectName][subObject],
          [name]: value,
        },
      },
    }));
  };

  return (
    <div className='flex flex-wrap items-center gap-4 border-primary-border rounded-md py-2'>
      <CheckBox
        label='Stroke'
        checked={settings[objectName][subObject].stroke}
        fieldName='stroke'
        onChange={handleChanges}
      />
      <AnimatePresence>
        {settings[objectName][subObject].stroke && (
          <motion.div
            key='strokeSettings'
            initial={{ opacity: 0, height: 0 }} // Start fully transparent and collapsed
            animate={{ opacity: 1, height: "auto" }} // Fade in and expand to content height
            exit={{ opacity: 0, height: 0 }} // Fade out and collapse
            transition={{ duration: 0.3 }} // Smooth transition duration
            className='inline-flex items-center gap-4'
          >
            <ColorPicker
              bg={settings[objectName][subObject].strokeColor}
              fieldName='strokeColor'
              handleColorChange={handleColorChange}
            />
            <NumberTagInput
              value={settings[objectName][subObject].strokeSize}
              onChange={(e) => handleChanges("strokeSize", e.target.value)}
              tag='size'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StrokeStyles;
