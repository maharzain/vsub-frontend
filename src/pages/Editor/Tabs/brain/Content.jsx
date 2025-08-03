import React, { useState } from "react";
import QuestionInput from "./components/QuestionInput";
import FilledButton from "../../../../components/FilledButton";
import { IconPlus } from "@tabler/icons-react";
import QuestionModal from "./components/QuestionModal";
import CommentModal from "./components/CommentModal";
import Notice from "../../../../components/Notice";

const Content = ({ questions, setQuestions }) => {
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  return (
    <div>
      <Notice bg='bg-[#162312]' borderColor='border-[#274916]'>
        Start creating video by adding your comments/questions. And then go to
        the subtitles tab and generate subtitles.
      </Notice>
      {questions.map((question, index) => (
        <QuestionInput
          key={index}
          index={index}
          question={question}
          setQuestions={setQuestions}
        />
      ))}

      <div className='flex justify-end pt-4 border-t-[1px] border-primary-border gap-4'>
        <FilledButton
          size='1.9rem'
          bgColor='bg-[#2a3041] hover:bg-[#2a3041]'
          onClick={() => setShowCommentModal(true)}
        >
          <IconPlus size={20} />
          Add Comment
        </FilledButton>

        <FilledButton
          size='1.9rem'
          bgColor='bg-[#2a3041] hover:bg-[#2a3041]'
          onClick={() => setShowQuestionModal(true)}
        >
          <IconPlus size={20} />
          Add Question
        </FilledButton>
      </div>

      <QuestionModal
        show={showQuestionModal}
        handleClose={() => setShowQuestionModal(false)}
        setQuestions={setQuestions}
      />

      <CommentModal
        show={showCommentModal}
        handleClose={() => setShowCommentModal(false)}
        setQuestions={setQuestions}
      />
    </div>
  );
};

export default Content;
