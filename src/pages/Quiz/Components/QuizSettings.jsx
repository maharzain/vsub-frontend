import { useState, useContext } from "react";
import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import {
  voiceProviders,
  elevenLabVoices,
  openAiVoices,
  quizPresetPrompts,
} from "../../../constants";
import RadioSelection from "../../../components/RadioSelection";
import { QuizContext } from "../index";
import Dropdown from "../../../components/Dropdown";
import Notice from "../../../components/Notice";
import { motion } from "framer-motion";
import InputText from "../../../components/InputText";

const QuizSettings = () => {
  const [promptType, setPromptType] = useState("Preset Prompt");
  const {
    voiceInput,
    voice,
    setVoice,
    handleVoiceInputChange,
    voiceProvider,
    setVoiceProvider,
    genBgImages,
    setGenBgImages,
    genQueImages,
    setGenQueImages,
    presetPrompt,
    setPresetPrompt,
    customPrompt,
    setCustomPrompt,
  } = useContext(QuizContext);

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
        onChange={handleVoiceInputChange}
        options={
          voiceProvider === "Elevenlabs" ? elevenLabVoices : openAiVoices
        }
        selectedOption={voice}
        setOptionValue={setVoice}
      />

      {/* BG IMAGES CHECKBOX */}
      <p className='mt-6'>Background images</p>
      <label className='inline-flex label cursor-pointer'>
        <input
          type='checkbox'
          checked={genBgImages}
          onChange={() => setGenBgImages(!genBgImages)}
          className='checkbox checkbox-sm checkbox-primary mr-2'
        />
        <span>Generate background images</span>
      </label>

      {/* Propmpts selection menu */}
      <RadioSelection
        option={promptType}
        setOption={setPromptType}
        optionOne='Preset Prompt'
        optionTwo='Custom Prompt'
      />

      {/* preset prompts Dropdown */}
      {promptType === "Preset Prompt" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Dropdown
            width={"w-60 sm:w-96"}
            value={presetPrompt}
            options={quizPresetPrompts}
            setOptionValue={setPresetPrompt}
          />
        </motion.div>
      )}

      {/* Custom prompt section */}

      {promptType === "Custom Prompt" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className='py-2 max-w-[25rem]'
        >
          <Notice bg='bg-darkBlue' borderColor='border-lightBlue'>
            <p className='text-primary-font text-left'>
              The prompt should be simple and generic, check the preset prompts
              for examples
            </p>
          </Notice>

          <InputText
            value={customPrompt}
            size={"w-[18.5rem] h-8 my-2"}
            placeholder='Prompt'
            onChange={(e) => setCustomPrompt(e.target.value)}
          />
        </motion.div>
      )}

      {/* QUESTIONS IMAGES CHECKBOX */}
      <p className='mt-4'>Question images</p>
      <label className='inline-flex label cursor-pointer'>
        <input
          type='checkbox'
          checked={genQueImages}
          onChange={() => setGenQueImages(!genQueImages)}
          className='checkbox checkbox-sm checkbox-primary mr-2'
        />
        <span>Generate question images</span>
      </label>
    </div>
  );
};

export default QuizSettings;
