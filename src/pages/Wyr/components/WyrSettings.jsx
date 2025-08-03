import { useState, useContext } from "react";
import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import {
  voiceProviders,
  elevenLabVoices,
  openAiVoices,
} from "../../../constants";
import { WyrContext } from "../index";
import Dropdown from "../../../components/Dropdown";
import InputText from "../../../components/InputText";

const QuizSettings = () => {
  const [promptType, setPromptType] = useState("Preset Prompt");
  const {
    voice,
    setVoice,
    voiceInput,
    setVoiceInput,
    voiceProvider,
    setVoiceProvider,
    genBgImages,
    setGenBgImages,
    orVoice,
    setOrVoice,
  } = useContext(WyrContext);

  return (
    <div className='text-primary-font'>
      <p className='mb-2'>Voice</p>
      {/* voice provider */}
      <Dropdown
        width={"w-44"}
        value={voiceProvider}
        options={voiceProviders}
        setOptionValue={setVoiceProvider}
      />
      <div className='mb-2' />
      {/* voice character selection */}
      <SearchMenu
        width={`${
          voiceProvider === "Elevenlabs"
            ? "w-[245px] sm:w-[34rem]"
            : "w-[245px]"
        }`}
        isVoice={voiceProvider === "Elevenlabs" ? true : false}
        inputField={true}
        name={"language"}
        inputType={"text"}
        value={voiceInput}
        image={searchIcon}
        onChange={(e) => {
          setVoiceInput(e.target.value);
        }}
        options={
          voiceProvider === "Elevenlabs" ? elevenLabVoices : openAiVoices
        }
        selectedOption={voice}
        setOptionValue={setVoice}
      />
      {/* Or Voiceover input */}
      <p className='mt-6'>"Or" text (use for voiceover only)</p>
      <InputText
        name='Or'
        placeholder='Or'
        size='w-[12rem] h-8'
        value={orVoice}
        onChange={(e) => {
          setOrVoice(e.target.value);
        }}
      />

      {/* BG IMAGES CHECKBOX */}
      <p className='mt-6'>Disable generating AI images</p>
      <label className='inline-flex label cursor-pointer'>
        <input
          type='checkbox'
          checked={genBgImages}
          onChange={() => setGenBgImages(!genBgImages)}
          className='checkbox checkbox-sm checkbox-primary mr-2'
        />
      </label>
    </div>
  );
};

export default QuizSettings;
