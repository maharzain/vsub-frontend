import { useContext } from "react";
import DropDown from "../../../components/Dropdown";
import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import {
  voiceProviders,
  elevenLabVoices,
  openAiVoices,
  videoSizes,
} from "../../../constants";
import { AiVideoContext } from "../index";

const AiVideoSettings = () => {
  const {
    voiceProvider,
    setVoiceProvider,
    voiceInput,
    removeSilence,
    setRemoveSilence,
    videoSize,
    setVideoSize,
    voice,
    setVoice,
    handleVoiceInputChange,
  } = useContext(AiVideoContext);
  return (
    <div className='text-primary-font'>
      <p className='mb-2'>Voice</p>
      <DropDown
        width={"w-44"}
        value={voiceProvider}
        options={voiceProviders}
        setOptionValue={setVoiceProvider}
      />

      <div className='my-2'>
        <SearchMenu
          width={`${voiceProvider === "Elevenlabs" ? "w-[245px] sm:w-[34rem]" : "w-[245px]"}`}
          isVoice={voiceProvider === "Elevenlabs" ? true : false}
          inputField={true}
          name={"language"}
          inputType={"text"}
          value={voiceInput}
          image={searchIcon}
          onChange={handleVoiceInputChange}
          options={
            voiceProvider === "Elevenlabs" ? elevenLabVoices : openAiVoices
          }
          selectedOption={voice}
          setOptionValue={setVoice}
        />
      </div>

      {/* remove silence checkbox */}
      <div className='mt-4'>
        <p>Auto remove silence</p>
        <label className='inline-flex label cursor-pointer'>
          <input
            type='checkbox'
            checked={removeSilence}
            onChange={() => setRemoveSilence(!removeSilence)}
            className='checkbox checkbox-sm checkbox-primary mr-2'
          />
        </label>
      </div>
      
      {/* video size selection */}
      <div className='mt-4'>
        <p className="mb-2">Size</p>

        <DropDown
        width={"w-44"}
        value={videoSize}
        options={videoSizes}
        setOptionValue={setVideoSize}
      />
      </div>

      <div className="pb-40"/>
    </div>
  );
};

export default AiVideoSettings;
