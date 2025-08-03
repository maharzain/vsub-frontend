import React, { useState } from "react";
import TextArea from "../../../../../components/TextArea";
import FilledButton from "../../../../../components/FilledButton";
import IconBolt from "../../../../../assets/images/IconBolt.svg";
import { IconPencil, IconTrash, IconVolume } from "@tabler/icons-react";
import VoiceModal from "../../../components/VoiceModal";
import AnswersModal from "./AnswersModal";
import BorderButton from "../../../../../components/BorderButton";

const QuestionInput = ({ questionData, setQuiz, selectedTemplate, index }) => {
  const [bgModal, setBgModal] = useState(false);
  const [isAnswersModalOpen, setIsAnswersModalOpen] = useState(false);

  const [voiceModalData, setVoiceModalData] = useState({
    isOpen: false,
    voiceType: "",
    voiceName: "",
    voiceProvider: "",
    index: null,
  });

  const handleVoiceClick = (type) => {
    setVoiceModalData({
      isOpen: true,
      voiceType: type,
      voiceName: questionData[`${type}VoiceName`],
      voiceProvider: questionData[`${type}VoiceProvider`],
      index: index,
    });
  };

  const updateVoiceData = (voiceType, provider, name) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((item, i) =>
        i === index
          ? {
              ...item,
              [`${voiceType}VoiceProvider`]: provider,
              [`${voiceType}VoiceName`]: name,
            }
          : item
      )
    );
    closeModal();
  };

  const closeModal = () => {
    setVoiceModalData({
      isOpen: false,
      voiceType: "",
      voiceName: "",
      voiceProvider: "",
      index: null,
    });
  };

  const toggleAnswersModal = () => {
    setIsAnswersModalOpen(!isAnswersModalOpen);
  };

  const handleStatementChange = (event) => {
    const newStatement = event.target.value;
    setQuiz((prevQuiz) =>
      prevQuiz.map((item, i) =>
        i === index ? { ...item, statement: newStatement } : item
      )
    );
  };

  const handleDeleteImage = (imageType) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((item, i) =>
        i === index
          ? {
              ...item,
              [imageType]: null, // Remove the image by setting it to null
            }
          : item
      )
    );
  };

  // Function to delete the current question from the quiz state
  const handleDeleteQuestion = () => {
    setQuiz((prevQuiz) => prevQuiz.filter((_, i) => i !== index));
  };

  return (
    <div className='text-primary-font w-full mb-6'>
      <div>
        <div className='w-full flex items-center gap-4'>
          <p>{index + 1}.</p>
          <TextArea
            name='statement'
            id='statement'
            value={questionData.statement}
            height='min-h-16 resize-none'
            onChange={handleStatementChange}
          />
          <IconTrash
            size={20}
            className='cursor-pointer'
            onClick={handleDeleteQuestion} // Call the delete function
          />
        </div>

        <div className='flex flex-wrap gap-4 mt-6 pl-7'>
          <span className='flex flex-wrap items-center gap-4'>
            <img
              src={questionData.bgImage}
              alt='Background'
              className='w-10 h-16 object-cover rounded-lg shadow-lg'
            />
            <p className='bg-[#2a3041] px-3 py-1 rounded-md'>
              Background Image
            </p>
            <FilledButton
              size='1.7rem'
              bgColor='bg-[#2a3041]'
              onClick={bgModal}
            >
              <img src={IconBolt} alt='bolt icon' />
            </FilledButton>
          </span>

          <span className='flex items-center gap-4'>
            {questionData.image && (
              <div className='flex items-center gap-4'>
                <img
                  src={questionData.image}
                  alt='Image'
                  className='w-20 h-12 object-cover rounded-lg shadow-lg'
                />
                <IconTrash
                  size={20}
                  className='cursor-pointer'
                  onClick={() => handleDeleteImage("image")}
                />
              </div>
            )}
            <FilledButton
              size='1.7rem'
              bgColor='bg-[#2a3041]'
              onClick={bgModal}
            >
              <img src={IconBolt} alt='bolt icon' />
            </FilledButton>
          </span>
        </div>

        {questionData.type === "Question" && (
          <div className='flex flex-wrap gap-4 mt-4 pl-7'>
            <BorderButton onClick={() => handleVoiceClick("question")}>
              <IconVolume size={20} />
              Question Audio
              <IconPencil size={20} className='cursor-pointer' />
            </BorderButton>

            <BorderButton onClick={() => handleVoiceClick("answer")}>
              <IconVolume size={20} />
              Answer Audio
              <IconPencil size={20} className='cursor-pointer ml-2' />
            </BorderButton>

            <BorderButton onClick={toggleAnswersModal}>
              <IconVolume size={20} />
              Answers
              <IconPencil size={20} className='cursor-pointer ml-2' />
            </BorderButton>

          </div>
        )}

        {questionData.type === "Comment" && (
          <span
            className='inline-flex items-center gap-2 bg-[#2a3041] px-3 py-2 rounded-md cursor-pointer mt-6 ml-7'
            onClick={() => handleVoiceClick("comment")}
          >
            <IconVolume size={20} />
            Comment Audio
            <IconPencil size={20} className='cursor-pointer ml-2' />
          </span>
        )}
      </div>

      {voiceModalData.isOpen && (
        <VoiceModal
          showModal={voiceModalData.isOpen}
          closeModal={closeModal}
          voiceType={voiceModalData.voiceType}
          voiceName={voiceModalData.voiceName}
          voiceProvider={voiceModalData.voiceProvider}
          onSave={(provider, name) =>
            updateVoiceData(voiceModalData.voiceType, provider, name)
          }
        />
      )}

      {isAnswersModalOpen && (
        <AnswersModal
          selectedTemplate={selectedTemplate}
          quiz={questionData} // Pass the full quiz state
          setQuiz={setQuiz} // Pass the setter function
          selectedQuestionIndex={index} // Pass the current question index
          show={isAnswersModalOpen}
          onClose={toggleAnswersModal}
        />
      )}
    </div>
  );
};

export default QuestionInput;
