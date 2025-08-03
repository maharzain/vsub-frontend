import React, { useState } from "react";
import {
  IconPencil,
  IconTrash,
  IconVolume,
} from "@tabler/icons-react";
import BorderButton from "../../../../../components/BorderButton";
import VoiceModal from "../../../components/VoiceModal";
import ContentModal from "./ContentModal";

const QuestionInput = ({ question, setQuestions, index }) => {
  const questionData = question.question; // Get the question data
  const qaVoice = question.voices; // Get the question and answer voices

  const [bgModal, setBgModal] = useState(false);
  const [showQuestionAudio, setShowQuestionAudio] = useState(false);
  const [showAnswerAudio, setShowAnswerAudio] = useState(false);
  const [showCommentAudio, setShowCommentAudio] = useState(false);
  const [showContentModal, setShowContentModal] = useState(false);

  // const toggleAnswersModal = () => {
  //   setIsAnswersModalOpen(!isAnswersModalOpen);
  // };

  // Function to delete the current question from the quiz state
  const handleDeleteQuestion = () => {
    setQuestions((prevQuiz) => prevQuiz.filter((_, i) => i !== index));
  };

  const updateQuestionVoices = (provider, name) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].voices.questionVoiceProvider = provider;
      updatedQuestions[index].voices.questionVoiceName = name;
      return updatedQuestions;
    });
  };

  const updateAnswerVoices = (provider, name) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].voices.answerVoiceProvider = provider;
      updatedQuestions[index].voices.answerVoiceName = name;
      return updatedQuestions;
    });
  };

  const updateCommentVoices = (provider, name) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].commentVoiceProvider = provider;
      updatedQuestions[index].commentVoiceName = name;
      return updatedQuestions;
    });
  };

  return (
    <div className='text-primary-font w-full my-6'>
      <div>
        <div className='w-full flex items-center gap-6'>
          <p>{index+1}.</p>
          {/* question statement block */}
          {question.type === "question" && (
            <div className='flex gap-4 w-full'>
              <img
                src={questionData.questionImage}
                alt={questionData.characterName}
                className='w-8 h-8 object-cover'
              />
              <p>{question.question.questionStatement}</p>
            </div>
          )}

          {/* comment statement block */}
          {question.type === "comment" && (
            <div className='flex gap-4 w-full'>
              <img
                src={question.characterImage}
                alt={question.characterName}
                className='w-8 h-8 object-cover'
              />
              <p>{question.commentStatement}</p>
            </div>
          )}
          <IconTrash
            size={20}
            className='cursor-pointer'
            onClick={handleDeleteQuestion} // Call the delete function
          />
        </div>

        <div className='flex justify-end flex-wrap gap-4 mt-3'>
          {question.type === "question" && (
            <BorderButton onClick={() => setShowQuestionAudio(true)}>
              <IconVolume size={15} />
              Question Audio
              <IconPencil size={15} className='cursor-pointer' />
            </BorderButton>
          )}

          {
            // this will show and its data be passed if question.type is comment
            question.type === "question" && (
              <BorderButton onClick={() => setShowAnswerAudio(true)}>
                <IconVolume size={20} />
                Answer Audio
                <IconPencil size={20} className='cursor-pointer ml-2' />
              </BorderButton>
            )
          }

          {question.type === "comment" && (
            <BorderButton onClick={() => setShowCommentAudio(true)}>
              <IconVolume size={20} />
              Comment Audio
              <IconPencil size={20} className='cursor-pointer ml-2' />
            </BorderButton>
          )}

          <span
            className='bg-[#171A25] border border-primary-border px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer'
            onClick={() => {
              setShowContentModal(true);
            }}
          >
            <IconVolume size={20} />
            Content
            <IconPencil size={20} className='cursor-pointer ml-2' />
          </span>
        </div>

        {/* <div className='flex justify-end flex-wrap gap-4 mt-3'>
          <span
            className='bg-[#2a3041] px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer'
            onClick={() => {}}
          >
            <IconPlus size={20} />
            Sound effect
          </span>

          <span
            className='bg-[#2a3041] px-3 py-1 rounded-md flex items-center gap-2 cursor-pointer'
            onClick={() => {}}
          >
            <IconPlus size={20} />
            Side comment
          </span>
        </div> */}
      </div>
      {/* question audio modal */}
      {question.type === "question" && (
        <div>
          {/* modal for question audio */}
          <VoiceModal
            showModal={showQuestionAudio}
            closeModal={() => {
              setShowQuestionAudio(false);
            }}
            voiceName={qaVoice.questionVoiceName}
            voiceProvider={qaVoice.questionVoiceProvider}
            onSave={(provider, name) => updateQuestionVoices(provider, name)}
          />
          {/* modal for answers audio */}
          <VoiceModal
            showModal={showAnswerAudio}
            closeModal={() => {
              setShowAnswerAudio(false);
            }}
            voiceName={qaVoice.answerVoiceName}
            voiceProvider={qaVoice.answerVoiceProvider}
            onSave={(provider, name) => updateAnswerVoices(provider, name)}
          />
        </div>
      )}

      {question.type === "comment" && (
        <VoiceModal
          showModal={showCommentAudio}
          closeModal={() => {
            setShowCommentAudio(false);
          }}
          voiceName={question.commentVoiceName}
          voiceProvider={question.commentVoiceProvider}
          onSave={(provider, name) => updateCommentVoices(provider, name)}
        />
      )}

      <ContentModal
        index={index}
        showModal={showContentModal}
        closeModal={() => setShowContentModal(false)}
        question={question}
        setQuestions={setQuestions}
      />
    </div>
  );
};

export default QuestionInput;
