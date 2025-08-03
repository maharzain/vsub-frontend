import React, { useState, useEffect, useRef } from "react";
import { SketchPicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";

const ColorPicker = ({ bg, fieldName, index, handleColorChange }) => {

  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const pickerRef = useRef(null);

  const handleChange = (newColor) => {
    if (index !== undefined) {
      handleColorChange(newColor, fieldName, index);
    } else {
      handleColorChange(newColor, fieldName);
    }
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  // Hide color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setDisplayColorPicker(false);
      }
    };

    if (displayColorPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [displayColorPicker]);

  return (
    <div className=''>
      {/* Color preview div */}
      <div
        className='w-7 h-7 rounded cursor-pointer'
        style={{ backgroundColor: bg }}
        onClick={handleClick}
      />

      {/* Render color picker with transition */}
      <AnimatePresence>
        {displayColorPicker && (
          <motion.div
            ref={pickerRef}
            className='mt-2'
            initial={{ opacity: 0, scale: 0.95 }} // Initial state
            animate={{ opacity: 1, scale: 1 }} // Animation on mount
            exit={{ opacity: 0, scale: 0.95 }} // Animation on unmount
            transition={{ duration: 0.2 }} // Transition duration
          >
            <SketchPicker
              color={bg}
              onChangeComplete={handleChange}
              styles={{
                default: {
                  picker: {
                    backgroundColor: "#1A212F", // Background color of the picker
                    borderRadius: "8px",
                    padding: "10px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
                  },
                },
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
