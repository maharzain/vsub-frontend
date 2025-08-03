import Modal from "../../../components/Modal";
import { IconTrash, IconPlus, IconPencil } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import BorderButton from "../../../components/BorderButton";
import InputText from "../../../components/InputText";
import { EditorContext } from "..";

const CaptionsEditor = () => {
  const {subtitles, setSubtitles} = useContext(EditorContext);
  const [hoverIndex, setHoverIndex] = useState(null);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);
  const [wordStartTime, setWordStartTime] = useState("");

  // Handles the input change for each word in the subtitle
  const handleInputChange = (e, subtitleIndex, wordIndex) => {
    const newSubtitles = [...subtitles];
    newSubtitles[subtitleIndex].words[wordIndex].text = e.target.value; // Update the specific word
    setSubtitles(newSubtitles);
  };

  // Update the startTime and endTime for a subtitle
  const handleTimeChange = (e, subtitleIndex, timeType) => {
    const newSubtitles = [...subtitles];
    newSubtitles[subtitleIndex][timeType] = e.target.value; // Update startTime or endTime
    setSubtitles(newSubtitles);
  };

  // Delete a specific word from a subtitle
  const deleteWord = (subtitleIndex, wordIndex) => {
    const newSubtitles = [...subtitles];
    newSubtitles[subtitleIndex].words.splice(wordIndex, 1); // Remove the word at wordIndex
    setSubtitles(newSubtitles);
  };

  // Delete an entire subtitle block
  const deleteSubtitle = (subtitleIndex) => {
    const newSubtitles = [...subtitles];
    newSubtitles.splice(subtitleIndex, 1); // Remove the subtitle at subtitleIndex
    setSubtitles(newSubtitles);
  };

  // Add a new subtitle block after the clicked one
  const addSubtitle = (subtitleIndex) => {
    const newSubtitles = [...subtitles];
    const currentSubtitle = newSubtitles[subtitleIndex];
    const newStartTime = currentSubtitle.endTime; // Set start time to current subtitle's end time

    // Create a new subtitle object
    const newSubtitle = {
      startTime: newStartTime,
      endTime: newStartTime, // You might want to set a default end time or handle it differently
      words: [],
    };

    // Add the new subtitle to the list
    newSubtitles.splice(subtitleIndex + 1, 0, newSubtitle);
    setSubtitles(newSubtitles);
  };

  // Add a new word to a subtitle
  const addWord = (subtitleIndex) => {
    const newSubtitles = [...subtitles];
    const currentSubtitle = newSubtitles[subtitleIndex];
    
    let startTime, endTime;
  
    if (currentSubtitle.words.length > 0) {
      // If there are existing words, set the new word's start time to the last word's end time
      const lastWord = currentSubtitle.words[currentSubtitle.words.length - 1];
      startTime = lastWord.endTime;
      
      // Calculate a new end time (e.g., 1 second after the start time)
      endTime = calculateNewEndTime(startTime, 0.2); // Helper function to add 1 second
    } else {
      // If this is the first word, use the subtitle's start and end times
      startTime = calculateNewEndTime(currentSubtitle.startTime, 1);
      endTime = currentSubtitle.endTime
      newSubtitles[subtitleIndex].endTime = calculateNewEndTime(currentSubtitle.startTime, 1)
    }
    newSubtitles[subtitleIndex].endTime = calculateNewEndTime(currentSubtitle.startTime, 1)
  
    // Ensure the new word's end time doesn't exceed the subtitle's end time
    endTime = endTime > currentSubtitle.endTime ? currentSubtitle.endTime : endTime;
  
    const newWord = {
      startTime,
      endTime,
      text: "", // New word text
    };
  
    currentSubtitle.words.push(newWord);
    setSubtitles(newSubtitles);
  };
  
  // Helper function to calculate a new time by adding seconds
  const calculateNewEndTime = (startTime, secondsToAdd) => {
    const [hours, minutes, seconds] = startTime.split(':').map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds + secondsToAdd;
  
    const newHours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const newMinutes = Math.floor(totalSeconds / 60);
    const newSeconds = totalSeconds % 60;
  
    return `${padZero(newHours)}:${padZero(newMinutes)}:${padZero(newSeconds)}`;
  };
  
  // Helper function to pad single digits with a leading zero
  const padZero = (num) => num.toString().padStart(2, '0');

  // Handle opening the modal for editing a word
  const openEditModal = (subtitleIndex, wordIndex) => {
    const word = subtitles[subtitleIndex].words[wordIndex];
    setWordStartTime(word.startTime);
    setSelectedWord({ subtitleIndex, wordIndex });
    setIsModalOpen(true);
  };

  // Handle updating the word start time
  const handleWordStartTimeChange = (e) => {
    setWordStartTime(e.target.value);
  };

  // Handle saving the changes in the modal
  const saveChanges = () => {
    if (selectedWord) {
      const newSubtitles = [...subtitles];
      newSubtitles[selectedWord.subtitleIndex].words[selectedWord.wordIndex].startTime = wordStartTime;
      setSubtitles(newSubtitles);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="">
      {subtitles.length > 0 && (
        <div>
          {subtitles.map((subtitle, subtitleIndex) => (
            <div
              key={subtitleIndex}
              className="flex items-center gap-6"
              onMouseEnter={() => setHoverIndex(subtitleIndex)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              {/* Display the time information */}
              <div className="flex flex-col gap-2 text-sm text-primary-font max-w-24">
                {/* Input fields for start and end times */}
                <input
                  type="text"
                  value={subtitle.startTime}
                  onChange={(e) => handleTimeChange(e, subtitleIndex, 'startTime')}
                  className="bg-transparent outline-none"
                />
                <input
                  type="text"
                  value={subtitle.endTime}
                  onChange={(e) => handleTimeChange(e, subtitleIndex, 'endTime')}
                  className="bg-transparent outline-none"
                />
              </div>
              {/* Editable words */}
              <div className="mt-2 flex w-full items-center flex-wrap gap-2 rounded-md bg-[#232635] p-3">
                {subtitle.words.map((word, wordIndex) => (
                  <div
                    key={wordIndex}
                    className="flex items-center gap-2 rounded-md bg-[#3A3D4C] px-2 py-1 text-primary-font"
                  >
                    {/* Word input */}
                    <input
                      type="text"
                      value={word.text}
                      onChange={(e) => handleInputChange(e, subtitleIndex, wordIndex)}
                      className="w-24 rounded-md border-2 border-none bg-[#171B25] px-3 py-[2px] hover:border-accentIndigo focus:border-accentIndigo focus:outline-none lg:max-w-80"
                    />
                    {/* Pencil icon to edit word start time */}
                    <IconPencil
                      size={20}
                      className="cursor-pointer"
                      onClick={() => openEditModal(subtitleIndex, wordIndex)}
                    />
                  </div>
                ))}
                <IconPlus
                  size={20}
                  className="cursor-pointer text-primary-font"
                  onClick={() => addWord(subtitleIndex)}
                />
              </div>
              {/* Buttons to add a new subtitle and delete the current one */}
              <div className="relative flex">
                <IconTrash
                  size={20}
                  className={`text-primary-font ${hoverIndex === subtitleIndex ? "opacity-100" : "opacity-0"} transition-opacity duration-200 cursor-pointer`}
                  onClick={() => deleteSubtitle(subtitleIndex)}
                />
                <IconPlus
                  size={20}
                  className={`absolute -right-6 text-primary-font ${hoverIndex === subtitleIndex ? "opacity-100" : "opacity-0"} transition-opacity duration-200 cursor-pointer`}
                  onClick={() => addSubtitle(subtitleIndex)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal title="Edit Word Start Time" width="w-96" show={isModalOpen} handleClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col">
          <label className="mb-2 text-sm text-primary-font">Start Time:</label>
          <InputText value={wordStartTime} onChange={handleWordStartTimeChange} />
          <div className="flex justify-end gap-2 mt-4">
            <BorderButton
              onClick={() => {
                deleteWord(selectedWord.subtitleIndex, selectedWord.wordIndex);
                setIsModalOpen(false);
              }}
            >
              Delete
            </BorderButton>
            <BorderButton
              onClick={() => {
                saveChanges();
                setIsModalOpen(false);
              }}
            >
              Save
            </BorderButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CaptionsEditor;
