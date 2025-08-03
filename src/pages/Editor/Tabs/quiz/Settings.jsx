import {motion , AnimatePresence} from "framer-motion";
import Notice from "../../../../components/Notice";
import RangeSlider from "../../../../components/RangeSlider";
import ColorPicker from "../../components/ColorPicker";
import CheckBox from "../../../../components/CheckBox";
import NumberTagInput from "../../../../components/NumberTagInput";
import TextStyles from "../../components/TextStyles";
import ShadowStyles from "../../components/ShadowStyles";
import ImageStyles from "../../components/ImageStyles";

const Settings = ({ settings, setSettings }) => {

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

  const handleTimer = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        [name]: value,
      },
    }));
  };

  // background images tab change handlers
  const handleBgImages = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      bgImages: {
        ...prev.bgImages,
        [name]: value,
      },
    }));
  };

  const handleTimerColor = (newColor, name) => {
    setSettings((prev) => ({
      ...prev,
      timer: {
        ...prev.timer,
        [name]: newColor.hex,
      },
    }));
  };

  // Layout Tab Functions
  const handleLayoutChanges = (name, value) => {
    setSettings((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [name]: value,
      },
    }));
  }

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

      {/* Question Number Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Question Number
        </div>
        <div className='collapse-content text-primary-font'>
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='qNo' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Question Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Question
        </div>
        <div className='collapse-content text-primary-font flex items-center gap-6'>
          {/* Show Timer */}
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='question' //pass the name of the settings object
          />
        </div>
      </div>

      {/*Question Images Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f] max-h-fit'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Question Images
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          {/* <div className='max-w-[50%] flex gap-4 border-2 border-primary-border p-2 rounded-md'></div> */}

          <ImageStyles
            settings={settings}
            setSettings={setSettings}
            objectName='questionImages'
          />
        </div>
      </div>

      {/* Background Images Styles Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Background Images
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <CheckBox
            label='Disable Zooming'
            fieldName='disableZooming'
            checked={settings.bgImages.disableZooming}
            onChange={handleBgImages}
          />

          <CheckBox
            label='Use single background images'
            fieldName='singleImage'
            checked={settings.bgImages.singleImage}
            onChange={handleBgImages}
          />
        </div>
      </div>

      {/* Answers Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Answers
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <TextStyles
            settings={settings} //pass settings for the values
            setSettings={setSettings} //pass setSettings for the function
            objectName='answers' //pass the name of the settings object
          />
        </div>
      </div>

      {/* Timer Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Timer
        </div>
        <div className='collapse-content text-primary-font flex flex-col gap-6'>
          <CheckBox
            label='Timer'
            fieldName='showTimer'
            checked={settings.timer.showTimer}
            onChange={handleTimer}
          />
          {/* colors and shadow*/}
          <AnimatePresence>
            {settings.timer.showTimer && (
              <motion.div
                key='shadowColorSettings'
                initial={{ opacity: 0, height: 0 }} // Start fully transparent and collapsed
                animate={{ opacity: 1, height: "auto" }} // Fade in and expand to content height
                exit={{ opacity: 0, height: 0 }} // Fade out and collapse
                transition={{ duration: 0.3 }} // Smooth transition duration
              >
                <div className='inline-flex flex-wrap items-center gap-8'>
                  {/* bg color */}
                  <span className='flex gap-3'>
                    <p>Background</p>
                    <ColorPicker
                      bg={settings.timer.bgColor}
                      fieldName='bgColor'
                      handleColorChange={handleTimerColor}
                    />
                  </span>
                  {/* color */}
                  <span className='flex gap-3'>
                    <p>Color</p>
                    <ColorPicker
                      bg={settings.timer.color}
                      fieldName='color'
                      handleColorChange={handleTimerColor}
                    />
                  </span>
                </div>
                {/* shadow styles for timer */}
                <ShadowStyles
                  settings={settings}
                  setSettings={setSettings}
                  objectName={"timer"}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <NumberTagInput
            value={settings.timer.duration}
            onChange={(e) => handleTimer("duration", e.target.value)}
            tag='ms'
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

      {/* Layout Tab */}
      <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
        <input type='radio' name='my-accordion-4' />
        <div className='collapse-title text-lg text-primary-font font-medium'>
          Layout
        </div>
        <div className='collapse-content text-primary-font flex flex-row flex-wrap gap-6'>
          {/* PaddingTOP */}
          <NumberTagInput
            value={settings.layout.paddingTop}
            onChange={(e) => handleLayoutChanges("paddingTop", e.target.value)}
            tag='Padding Top'
          />
          {/* PaddingX */}
          <NumberTagInput
            value={settings.layout.paddingX}
            onChange={(e) => handleLayoutChanges("paddingX", e.target.value)}
            tag='Padding X'
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
