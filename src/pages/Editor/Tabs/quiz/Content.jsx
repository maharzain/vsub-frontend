import React from "react";
import QuestionInput from "./components/QuestionInput";

const Content = ({ quiz, setQuiz, selectedTemplate }) => {
  return (
    <div>
      {quiz.map((questionData, index) => (
        <QuestionInput
          key={index}
          questionData={questionData} // Pass the entire quiz entry
          setQuiz={setQuiz}
          selectedTemplate={selectedTemplate}
          index={index} // Pass the index for updates
        />
      ))}
    </div>
  );
};

export default Content;
