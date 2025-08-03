import React from "react";
import Notice from "../../../../components/Notice";
import RangeSlider from "../../../../components/RangeSlider";
import ColorPicker from "../../components/ColorPicker";
import Layout from "./components/Layout";
import CheckBox from "../../../../components/CheckBox";
import NumberTagInput from "../../../../components/NumberTagInput";
import TextStyles from "../../components/TextStyles";
import { motion, AnimatePresence } from "framer-motion";
import SoundsVolume from "./components/SoundsVolume";

const Settings = ({ settings, setSettings }) => {
  const optionText = settings.optionText;

  const handleVoiceChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      voice: {
        ...prev.voice,
        [field]: value,
      },
    }));
  };

  // Timer Tab Functions
  const handleColorChange = (newColor, name) => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        [name]: newColor.hex,
      },
    }));
  };

  const handleShowTimer = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        [name]: value,
      },
    }));
  };
  // images tab change handlers
  const handleImages = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [name]: value,
      },
    }));
  };

  const handleImagesShadow = (newColor, name) => {
    setSettings((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [name]: newColor.hex,
      },
    }));
  };
  // sounds tab change handlers
  const handleSounds = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      sounds: {
        ...prev.sounds,
        [name]: value,
      },
    }));
  };

  return (
    <div className='join join-vertical w-full gap-4'>
      {/*Voice Settings */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Voice
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-4'>
          <Notice bg={"bg-[#2B2111]"} borderColor={"border-[#7a4d04]"}>
            Changing the volume to 100% or altering the voice pitch will only be
            applied during rendering. However, you can generate preview audio to
            test settings.
          </Notice>
          <RangeSlider
            value={settings.voice.voiceSpeed}
            onChange={(e) => handleVoiceChange("voiceSpeed", e.target.value)} // Extracting the value
            min={0}
            max={100}
            label='Voice Speed'
          />

          <RangeSlider
            value={settings.voice.voiceVolume}
            onChange={(e) => handleVoiceChange("voiceVolume", e.target.value)} // Extracting the value
            min={0}
            max={100}
            label='Voice Volume'
          />

          <RangeSlider
            value={settings.voice.voicePitch}
            onChange={(e) => handleVoiceChange("voicePitch", e.target.value)} // Extracting the value
            min={0}
            max={100}
            label='Voice Pitch'
          />
        </div>
      </div>

      {/* Layout Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Layout
        </div>
        <div className='collapse-content text-primary-font'>
          <Layout settings={settings} setSettings={setSettings} />
        </div>
      </div>

      {/* Timer Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Timer
        </div>
        <div className='collapse-content text-primary-font flex items-center gap-6'>
          {/* Show Timer */}

          <CheckBox
            label='Show Timer'
            fieldName='showTimer'
            checked={settings.timer.showTimer}
            onChange={handleShowTimer}
          />

          <div className='flex items-center gap-3'>
            Timer Color
            <ColorPicker
              bg={settings.timer.timerColor}
              name='timerColor'
              handleColorChange={handleColorChange}
            />
          </div>
        </div>
      </div>

      {/* Images Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Images
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <div className='max-w-[50%] flex gap-4 border-2 border-primary-border p-2 rounded-md'>
            {/* Show Images */}
            <CheckBox
              label='Show Images'
              fieldName='showImages'
              checked={settings.images.showImages}
              onChange={handleImages}
            />

            <NumberTagInput
              value={settings.images.radius}
              onChange={(e) => {
                handleImages("radius", e.target.value);
              }}
              tag='Radius'
            />
          </div>
          {/* shadow */}
          <div className='flex items-center gap-4'>
            <CheckBox
              label='Shadow'
              fieldName='shadow'
              checked={settings.images.shadow}
              onChange={handleImages}
            />

            <AnimatePresence>
              {settings.images.shadow && (
                <motion.div
                  key='shadowSettings'
                  initial={{ opacity: 0, height: 0 }} // Start fully transparent and collapsed
                  animate={{ opacity: 1, height: "auto" }} // Fade in and expand to content height
                  exit={{ opacity: 0, height: 0 }} // Fade out and collapse
                  transition={{ duration: 0.3 }} // Smooth transition duration
                  className='flex items-center gap-4'
                >
                  {/* ColorPicker and NumberTagInput as children of the same motion div */}
                  <ColorPicker
                    bg={settings.images.shadowColor}
                    name='shadowColor'
                    handleColorChange={handleImagesShadow}
                  />
                  <NumberTagInput
                    value={settings.images.shadowSize}
                    onChange={(e) => handleImages("shadowSize", e.target.value)}
                    tag='size'
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/*Radius */}
          <NumberTagInput
            value={settings.images.maxWidth}
            onChange={(e) => {
              handleImages("maxWidth", e.target.value);
            }}
            tag='Max Width %'
          />
        </div>
      </div>

      {/* Images Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Option Text
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='optionText' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Result Text Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Result Text
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='resultText' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Or Text Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          "Or" Text
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='orText' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Comments Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Comments
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='comments' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Sounds Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Sounds
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          {/* next question */}
          <SoundsVolume
            checkBoxLabel='Next Question'
            checkBoxname='nextQuestion'
            rangeName='nextQuestionVolume'
            settings={settings}
            setSettings={setSettings}
          />
          {/*timer  */}
          <SoundsVolume
            checkBoxLabel='Timer'
            checkBoxname='timer'
            rangeName='timerVolume'
            settings={settings}
            setSettings={setSettings}
          />
          {/* result */}
          <SoundsVolume
            checkBoxLabel='Result'
            checkBoxname='result'
            rangeName='resultVolume'
            settings={settings}
            setSettings={setSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
