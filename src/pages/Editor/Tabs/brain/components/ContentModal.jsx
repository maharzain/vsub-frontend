import { useState, useEffect } from "react";
import Modal from "../../../../../components/Modal";
import InputText from "../../../../../components/InputText";
import FilledButton from "../../../../../components/FilledButton";

const ContentModal = ({
  showModal,
  closeModal,
  question,
  setQuestions,
  index,
}) => {
  // Set initial states based on the type of question or comment
  const [questionStatement, setQuestionStatement] = useState("");
  const [answerStatement, setAnswerStatement] = useState("");
  const [commentStatement, setCommentStatement] = useState("");

  // Initialize the state when the modal opens
  useEffect(() => {
    if (question.type === "question") {
      setQuestionStatement(question.question.questionStatement);
      setAnswerStatement(question.question.answerStatement);
    } else if (question.type === "comment") {
      setCommentStatement(question.commentStatement);
    }
  }, [question]);

  const handleSave = () => {
    // Save the content based on the type
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];

      if (question.type === "question") {
        // Update the question content
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          question: {
            ...updatedQuestions[index].question,
            questionStatement: questionStatement,
            answerStatement: answerStatement,
          },
        };
      } else if (question.type === "comment") {
        // Update the comment content
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          commentStatement: commentStatement,
        };
      }

      return updatedQuestions;
    });

    closeModal(); // Close the modal after saving
  };

  return (
    <Modal title="Edit Content" show={showModal} handleClose={closeModal}>
      {question.type === "question" && (
        <div>
          <p className="text-primary-font font-bold mb-3">Question</p>
          <InputText
            value={questionStatement}
            name="questionStatement"
            onChange={(e) => setQuestionStatement(e.target.value)}
            size="w-full"
          />

          <p className="text-primary-font font-bold my-3">Answer</p>
          <InputText
            value={answerStatement}
            name="answerStatement"
            onChange={(e) => setAnswerStatement(e.target.value)}
            size="w-full"
          />
        </div>
      )}

      {question.type === "comment" && (
        <div>
          <p className="text-primary-font font-bold mb-3">Comment</p>
          <InputText
            value={commentStatement}
            name="commentStatement"
            onChange={(e) => setCommentStatement(e.target.value)}
            size="w-full"
          />
        </div>
      )}

      <div className="flex justify-end gap-4 mt-4">
        <FilledButton
          size="2rem"
          bgColor="bg-[#2a3041] hover:bg-[#2a3041]"
          onClick={closeModal}
        >
          Cancel
        </FilledButton>
        <FilledButton
          size="2rem"
          bgColor="bg-[#2a3041] hover:bg-[#2a3041]"
          onClick={handleSave}
        >
          Save content
        </FilledButton>
      </div>
    </Modal>
  );
};

export default ContentModal;
