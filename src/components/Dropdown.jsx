import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Dropdown = ({ width, value, options, setOptionValue }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const optionsRef = useRef(null);

  const handleToggle = () => {
    setShowOptions((prev) => !prev);
  };

  const handleOptionClick = (e) => {
    const selectedValue = e.currentTarget.dataset.value;
    setOptionValue(selectedValue);
    setShowOptions(false);
  };

  const handleKeyDown = (e) => {
    if (!showOptions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // Prevent page scroll
        setHighlightedIndex((prevIndex) =>
          prevIndex === options.length - 1 ? 0 : prevIndex + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault(); // Prevent page scroll
        setHighlightedIndex((prevIndex) =>
          prevIndex <= 0 ? options.length - 1 : prevIndex - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          const selectedValue = options[highlightedIndex];
          setOptionValue(selectedValue);
          setShowOptions(false); // Close the dropdown
        }
        break;
      case "Escape":
        setShowOptions(false); // Close the dropdown if Escape is pressed
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (highlightedIndex >= 0 && optionsRef.current) {
      const optionElement = optionsRef.current.children[highlightedIndex];
      const containerHeight = optionsRef.current.offsetHeight;
      const optionTop = optionElement.offsetTop;
      const optionHeight = optionElement.offsetHeight;
      const scrollTop = optionsRef.current.scrollTop;

      if (optionTop + optionHeight > scrollTop + containerHeight) {
        optionsRef.current.scrollTop =
          optionTop + optionHeight - containerHeight;
      } else if (optionTop < scrollTop) {
        optionsRef.current.scrollTop = optionTop;
      }
    }
  }, [highlightedIndex]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className='relative inline-block text-primary-font' ref={dropdownRef}>
      <button
        className={`flex justify-between py-1 items-center ${width} border-2 border-[#2B3040] hover:border-[#7369DC] rounded-md p-[2px] px-3`}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        tabIndex='0'
      >
        <span>{value || "Select an option"}</span>
        <svg
          viewBox='64 64 896 896'
          focusable='false'
          data-icon='down'
          width='1em'
          height='1em'
          fill='currentColor'
          aria-hidden='true'
        >
          <path d='M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'></path>
        </svg>
      </button>

      <AnimatePresence>
        {showOptions && (
          <motion.ul
            ref={optionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`bg-[#242838] ${width} scrollbar max-h-72 absolute top-full left-0 p-1 rounded-md overflow-y-auto overflow-x-hidden z-10 mt-1`}
            tabIndex='0'
          >
            {options.map((option, index) => (
              <motion.li
                key={index}
                className={`${
                  value === option || highlightedIndex === index
                    ? "bg-[#161628] hover:bg-none"
                    : "hover:bg-dimGray-3"
                } hover:cursor-pointer rounded-md p-1 px-3 mb-1`}
                data-value={option}
                onMouseDown={handleOptionClick}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
