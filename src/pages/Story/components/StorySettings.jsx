import { useContext } from "react";
import DropDown from "../../../components/Dropdown";
import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import {
  voiceProviders,
  elevenLabVoices,
  openAiVoices,
} from "../../../constants";
import { StoryContext } from "../index";

const StorySettings = () => {
  const {
    voiceProvider,
    setVoiceProvider,
    voiceInput,
    voice,
    setVoice,
    handleVoiceInputChange,
  } = useContext(StoryContext);

  return (
    <div className='text-primary-font'>
      <p className='mb-2'>Voice</p>
      {/* Voice providers */}
      <DropDown
        width={"w-44"}
        value={voiceProvider}
        options={voiceProviders}
        setOptionValue={setVoiceProvider}
      />
      <div className='mt-2' />
      {/* voice character selection */}
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
  );
};

export default StorySettings;
