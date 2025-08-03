import React from "react";
import Option from "../../../../Quiz/Components/Option";
import InputText from "../../../../../components/InputText";
import Modal from "../../../../../components/Modal";
import BorderButton from "../../../../../components/BorderButton";
import FilledButton from "../../../../../components/FilledButton";

const AnswersModal = ({
  selectedTemplate,
  quiz,
  setQuiz,
  selectedQuestionIndex, // Track the index of the clicked question
  show,
  onClose,
}) => {
  // Update the option in the specific question
  const handleOptionChange = (optionIndex, updatedOption) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((question, qIndex) =>
        qIndex === selectedQuestionIndex
          ? {
              ...question,
              options: question.options.map((option, oIndex) =>
                oIndex === optionIndex ? updatedOption : option
              ),
            }
          : question
      )
    );
  };

  // Update the correct option in the specific question
  const handleCorrectOptionChange = (optionIndex) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((question, qIndex) =>
        qIndex === selectedQuestionIndex
          ? {
              ...question,
              options: question.options.map((option, oIndex) => ({
                ...option,
                isCorrect: oIndex === optionIndex,
              })),
            }
          : question
      )
    );
  };

  // Update the answer for multi-level questions
  const handleAnswerChange = (updatedAnswer) => {
    setQuiz((prevQuiz) =>
      prevQuiz.map((question, qIndex) =>
        qIndex === selectedQuestionIndex
          ? { ...question, answer: updatedAnswer }
          : question
      )
    );
  };

  const selectedQuestion = quiz; // Get the selected question

  return (
    <Modal
      title='Edit Answers'
      show={show}
      handleClose={onClose}
      width='w-[30%]'
    >
      {selectedQuestion && (
        <div className='mt-4 mb-8'>
          {selectedTemplate === "Standard" ? (
            <div className='flex flex-col gap-4'>
              {selectedQuestion.options.map((option, optionIndex) => (
                <Option
                  key={optionIndex}
                  option={option}
                  isCorrect={option.isCorrect}
                  onChange={(updatedOption) =>
                    handleOptionChange(optionIndex, updatedOption)
                  }
                  setCorrectOption={() =>
                    handleCorrectOptionChange(optionIndex)
                  }
                />
              ))}
            </div>
          ) : selectedTemplate === "Multi levels" ? (
            <div>
              <InputText
                value={selectedQuestion.answer || ""}
                onChange={(e) => handleAnswerChange(e.target.value)}
                size='w-full h-8'
              />
            </div>
          ) : null}
        </div>
      )}
      <div className='flex justify-end gap-4'>
        <BorderButton onClick={onClose}>Cancel</BorderButton>
        <FilledButton size='1.8rem' onClick={onClose}>
          Save Answers
        </FilledButton>
      </div>
    </Modal>
  );
};

export default AnswersModal;
