import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import { editorFonts } from "../../../constants";
import { useState, useEffect } from "react";
import NumberTagInput from "../../../components/NumberTagInput";
import CheckBox from "../../../components/CheckBox";
import ColorPicker from "./ColorPicker";
import { motion, AnimatePresence } from "framer-motion";
import InputText from "../../../components/InputText";
import ShadowStyles from "./ShadowStyles";
import DropDown from "../../../components/Dropdown";

const TextStyles = ({ settings, setSettings, objectName }) => {
  const [voiceInput, setVoiceInput] = useState("");
  const [font, setFont] = useState(settings[objectName].font);
  const [wordDisplay, setwordDisplay] = useState("All");

  const handleChanges = (valueName, value) => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        [valueName]: value,
      },
    }));
  };

  // Update settings when font changes
  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        font: font, // Update the font property with the new value
      },
    }));
  }, [font, setSettings]);

  const handleColorChange = (newColor, valueName) => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        [valueName]: newColor.hex,
      },
    }));
  };

  useEffect(() => {
    setSettings((prev) => ({
      ...prev,
      [objectName]: {
        ...prev[objectName],
        wordDisplay: wordDisplay,
      },
    }));
  }, [wordDisplay]);

  return (
    <div>
      <div className='inline-flex flex-wrap gap-4'>
        {/* font selection */}
        <SearchMenu
          width={"w-[13rem] md:w-[20rem]"}
          inputField={true}
          name={"fonts"}
          inputType={"text"}
          value={voiceInput}
          image={searchIcon}
          isVoice={false}
          onChange={(e) => {
            setVoiceInput(e.target.value);
          }}
          options={editorFonts}
          selectedOption={font}
          setOptionValue={setFont}
        />

        <NumberTagInput
          value={settings[objectName].fontSize}
          onChange={(e) => {
            handleChanges("fontSize", e.target.value);
          }}
          tag='size'
        />

        <CheckBox
          label='Upper Case'
          fieldName={"upperCase"}
          checked={settings[objectName].upperCase}
          onChange={handleChanges}
        />
      </div>

      <div className='inline-flex gap-4 items-center mt-6 border-2 border-primary-border rounded-md py-1 px-3 mb-3'>
        {/* font style */}
        <div className='inline-flex flex-wrap gap-4 px-2 py-1'>
          <span
            className={`font-extrabold rounded-md text-white hover:bg-gray-600 hover:text-white hover:cursor-pointer p-1 px-3 ${
              settings[objectName].fontStyle === "Extra Bold"
                ? "bg-gray-600"
                : null
            }`}
            onClick={() => {
              handleChanges("fontStyle", "Extra Bold");
            }}
          >
            Extra B
          </span>
          <span
            className={`font-extrabold rounded-md text-white hover:bg-gray-600 hover:text-white hover:cursor-pointer p-1 px-3 ${
              settings[objectName].fontStyle === "Bold" ? "bg-gray-600" : null
            }`}
            onClick={() => {
              handleChanges("fontStyle", "Bold");
            }}
          >
            B
          </span>
          <span
            className={`font-extrabold rounded-md text-white hover:bg-gray-600 hover:text-white hover:cursor-pointer p-1 px-3 ${
              settings[objectName].fontStyle === "Italic" ? "bg-gray-600" : null
            }`}
            onClick={() => {
              handleChanges("fontStyle", "Italic");
            }}
          >
            I
          </span>
        </div>

        <div className='px-2 py-1'>
          <ColorPicker
            bg={settings[objectName].textColor}
            fieldName='textColor'
            handleColorChange={handleColorChange}
          />
        </div>
      </div>

      {/* shadow */}
      <ShadowStyles
        settings={settings}
        setSettings={setSettings}
        objectName={objectName}
      />

      {/* result text colors */}
      {objectName === "resultText" && (
        <div className='inline-flex items-center gap-4 mt-6'>
          <span className='inline-flex items-center gap-3'>
            <p>Higher Color</p>
            <ColorPicker
              bg={settings[objectName].higherColor}
              fieldName='higherColor'
              handleColorChange={handleColorChange}
            />
          </span>

          <span className='inline-flex items-center gap-3'>
            <p>Lower Color</p>
            <ColorPicker
              bg={settings[objectName].lowerColor}
              fieldName='lowerColor'
              handleColorChange={handleColorChange}
            />
          </span>
        </div>
      )}

      {objectName === "orText" && (
        <div className='mt-3 inline-flex items-center gap-4 border border-primary-border px-3 py-2 rounded-md'>
          <p>"Or" text</p>

          <InputText
            value={settings[objectName].orText}
            placeholder='Or'
            name='orText'
            size='w-32'
            onChange={(e) => handleChanges("orText", e.target.value)}
          />
        </div>
      )}
      {/* box part of styles */}
      {(objectName === "qNo" ||
        objectName === "question" ||
        objectName === "answers") && (
        <div className='mt-3 inline-flex flex-wrap items-center gap-4 border border-primary-border px-3 py-2 rounded-md'>
          <CheckBox
            label='Box'
            fieldName={"box"}
            checked={settings[objectName].box}
            onChange={handleChanges}
          />

          <AnimatePresence>
            {settings[objectName].box && (
              <motion.div
                key='boxSettings'
                initial={{ opacity: 0, height: 0 }} // Start fully transparent and collapsed
                animate={{ opacity: 1, height: "auto" }} // Fade in and expand to content height
                exit={{ opacity: 0, height: 0 }} // Fade out and collapse
                transition={{ duration: 0.3 }} // Smooth transition duration
                className='inline-flex flex-wrap items-center gap-4'
              >
                <ColorPicker
                  bg={settings[objectName].boxColor}
                  fieldName='boxColor'
                  handleColorChange={handleColorChange}
                />

                <NumberTagInput
                  value={settings[objectName].boxRadius}
                  onChange={(e) => {
                    handleChanges("boxRadius", e.target.value);
                  }}
                  tag='Radius'
                />

                <NumberTagInput
                  value={settings[objectName].boxPadding}
                  onChange={(e) => {
                    handleChanges("boxPadding", e.target.value);
                  }}
                  tag='Padding'
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {objectName === "answers" && (
        <div className='mt-3 flex flex-col flex-wrap gap-4'>
          <p className='py-3 font-bold'>Others</p>

          <div className='flex flex-wrap items-center gap-4'>
            <p>Correct answer</p>
            <ColorPicker
              bg={settings[objectName].correctColor}
              fieldName='correctColor'
              handleColorChange={handleColorChange}
            />
            <NumberTagInput
              value={settings[objectName].space}
              onChange={(e) => {
                handleChanges("space", e.target.value);
              }}
              tag='Radius'
            />
          </div>
        </div>
      )}

      {objectName === "comments" && (
        <div className='mb-28'>
          <p className='font-bold my-3'>Word Display</p>
          <DropDown
            width={"w-36"}
            value={wordDisplay}
            options={["All", "Line", "Word"]}
            setOptionValue={setwordDisplay}
          />
        </div>
      )}
    </div>
  );
};

export default TextStyles;
