import CheckBox from "../../../components/CheckBox";
import { motion, AnimatePresence } from "framer-motion";
import ColorPicker from "../components/ColorPicker";
import NumberTagInput from "../../../components/NumberTagInput";

const ShadowStyles = ({ settings, setSettings, objectName }) => {
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
    <div className='flex flex-wrap items-center gap-4 border-primary-border rounded-md py-2'>
      <CheckBox
        label='Shadow'
        checked={settings[objectName].shadow}
        fieldName='shadow'
        onChange={handleChanges}
      />
      <AnimatePresence>
        {settings[objectName].shadow && (
          <motion.div
            key='shadowSettings'
            initial={{ opacity: 0, height: 0 }} // Start fully transparent and collapsed
            animate={{ opacity: 1, height: "auto" }} // Fade in and expand to content height
            exit={{ opacity: 0, height: 0 }} // Fade out and collapse
            transition={{ duration: 0.3 }} // Smooth transition duration
            className='inline-flex items-center gap-4'
          >
            <ColorPicker
              bg={settings[objectName].shadowColor}
              fieldName='shadowColor'
              handleColorChange={handleColorChange}
            />
            <NumberTagInput
              value={settings[objectName].shadowSize}
              onChange={(e) => handleChanges("shadowSize", e.target.value)}
              tag='size'
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShadowStyles;
