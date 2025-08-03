import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { filterOptions } from "../utils";
// import '../../src/App.css'

const SearchMenu = ({
  width,
  inputField,
  name,
  inputType,
  value,
  image,
  onChange,
  options,
  selectedOption,
  setOptionValue,
  isVoice,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const optionsRef = useRef(null);

  const handleFocus = () => {
    setShowOptions(true);
  };

  const handleBlur = () => {
    setTimeout(() => setShowOptions(false), 150);
  };

  const handleOptionClick = (e) => {
    const selectedValue = e.currentTarget.dataset.value;
    const selectedItem = filterOptions(value, options, isVoice).find((item) =>
      isVoice ? item.name === selectedValue : item === selectedValue
    );

    // If isVoice is true, set only the name, otherwise set the whole object/value
    setOptionValue(isVoice ? selectedItem.name : selectedItem);
    setShowOptions(false);
  };

  const handleKeyDown = (e) => {
    if (!showOptions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault(); // Prevent page scroll
        setHighlightedIndex((prevIndex) =>
          prevIndex === filterOptions(value, options, isVoice).length - 1
            ? 0
            : prevIndex + 1
        );
        break;
      case "ArrowUp":
        e.preventDefault(); // Prevent page scroll
        setHighlightedIndex((prevIndex) =>
          prevIndex <= 0
            ? filterOptions(value, options, isVoice).length - 1
            : prevIndex - 1
        );
        break;
      case "Enter":
        if (highlightedIndex >= 0) {
          const selectedItem = filterOptions(value, options, isVoice)[
            highlightedIndex
          ];

          // If isVoice is true, set only the name, otherwise set the whole object/value
          setOptionValue(isVoice ? selectedItem.name : selectedItem);
          setShowOptions(false);
        }
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

  return (
    <div>
      <div
        className={`flex justify-between ${width} relative border-2 border-primary-border hover:border-accentIndigo rounded-md p-1 px-3`}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        tabIndex='0'
      >
        {inputField && (
          <input
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={handleFocus}
            className={`${
              isVoice ? "w-40 sm:w-64" : "w-32"
            } bg-transparent focus:outline-none`}
            placeholder={selectedOption?.name || selectedOption || ""}
          />
        )}
        {image && <img src={image} alt='icon' />}
        <AnimatePresence>
          {showOptions && (
            <motion.ul
              ref={optionsRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`scrollbar ${width} bg-[#242838] max-h-72 absolute top-10 left-0 p-1 rounded-md overflow-y-auto overflow-x-auto sm:overflow-x-hidden z-10`}
              tabIndex='0'
            >
              {isVoice
                ? filterOptions(value, options, isVoice).map((voice, index) => (
                    <li
                      key={index}
                      className={`flex items-center gap-4 ${
                        selectedOption === voice.name ||
                        highlightedIndex === index
                          ? "bg-[#161628] hover:bg-none"
                          : "hover:bg-dimGray-3"
                      } hover:cursor-pointer rounded-md p-1 px-3 mb-1 w-[34rem]`}
                      data-value={voice.name}
                      onMouseDown={handleOptionClick}
                    >
                      <span>{voice.name}</span>
                      <div className='flex flex-col'>
                        <div className='flex space-x-1 mt-1'>
                          {voice.chips.map((chip, chipIndex) => {
                            const chipStyles = [
                              { bg: "#1a1325", text: "#854eca" },
                              { bg: "#112123", text: "#33bcb7" },
                              { bg: "#2b1d11", text: "#e89a3c" },
                              { bg: "#1f2611", text: "#a9d134" },
                            ];

                            const { bg, text } =
                              chipStyles[chipIndex % chipStyles.length];

                            return chip ? (
                              <span
                                key={chipIndex}
                                className='text-xs rounded-md px-3 py-[6px]'
                                style={{ backgroundColor: bg, color: text }}
                              >
                                {chip}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </li>
                  ))
                : filterOptions(value, options, isVoice).map((lang, index) => (
                    <li
                      key={index}
                      className={`${
                        selectedOption === lang || highlightedIndex === index
                          ? "bg-[#161628] hover:bg-none"
                          : "hover:bg-dimGray-3"
                      } hover:cursor-pointer rounded-md p-1 px-3 mb-1 text-white`}
                      data-value={lang}
                      onMouseDown={handleOptionClick}
                    >
                      {lang}
                    </li>
                  ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchMenu;
