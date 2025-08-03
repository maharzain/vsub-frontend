import React from "react";
import RenderQuestions from "./components/RenderQuestion";

const Content = ({ questions, setQuestions }) => {
  return (
    <div>
      {/* Map through the questions array and render each question */}
      {questions.map((_, index) => (
        <RenderQuestions
          key={index}
          index={index}
          questions={questions}
          setQuestions={setQuestions}
        />
      ))}
    </div>
  );
};

export default Content;
