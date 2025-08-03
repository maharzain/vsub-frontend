import React, { useState } from "react";
import DropDown from "../../../components/Dropdown";
import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import Modal from "../../../components/Modal";
import {
  voiceProviders,
  elevenLabVoices,
  openAiVoices,
} from "../../../constants";
import FilledButton from "../../../components/FilledButton";
import BorderButton from "../../../components/BorderButton";

const VoiceModal = ({
  showModal,
  closeModal,
  voiceType,
  voiceName,
  voiceProvider,
  onSave,
}) => {
  const [selectedVoiceProvider, setSelectedVoiceProvider] =
    useState(voiceProvider);
  const [voiceInput, setVoiceInput] = useState("");
  const [selectedVoice, setSelectedVoice] = useState(voiceName);

  // Save the selected provider and voice back to parent component
  const handleSave = () => {
    onSave(selectedVoiceProvider, selectedVoice);
    closeModal();
  };

  return (
    <Modal title='Edit Voiceover' width="w-[70%] lg:w-[40%]" show={showModal} handleClose={closeModal}>
      <p className='mb-2'>Voice</p>
      {/* Voice providers */}
      <DropDown
        width={"w-52"}
        value={selectedVoiceProvider}
        options={voiceProviders}
        setOptionValue={setSelectedVoiceProvider}
      />
      <div className='mt-2' />
      {/* voice character selection */}
      <SearchMenu
        width={"w-full"}
        isVoice={selectedVoiceProvider === "Elevenlabs"}
        inputField={true}
        name={"language"}
        inputType={"text"}
        value={voiceInput}
        image={searchIcon}
        onChange={(e) => setVoiceInput(e.target.value)}
        options={
          selectedVoiceProvider === "Elevenlabs"
            ? elevenLabVoices
            : openAiVoices
        }
        selectedOption={selectedVoice}
        setOptionValue={setSelectedVoice}
      />
      {/* Save button */}
      <div className='my-4' />
      <FilledButton onClick={handleSave} size='2rem'>
        Regenerate
      </FilledButton>

      <div className='flex justify-end gap-4 mt-6'>
        <BorderButton onClick={closeModal}>Cancel</BorderButton>
        <FilledButton size='1.8rem' onClick={handleSave}>
          Save voice
        </FilledButton>
      </div>
    </Modal>
  );
};

export default VoiceModal;
