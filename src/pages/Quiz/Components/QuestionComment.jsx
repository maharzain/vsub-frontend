import React, { useContext } from "react";
import Dropdown from "../../../components/Dropdown";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Option from "./Option";
import InputText from "../../../components/InputText";
import { QuizContext } from "../index";

const QuestionComment = ({ index, data }) => {
  // Access the questions and setQuestions function from the QuizContext
  const { questions, setQuestions, selectedTemplate } = useContext(QuizContext);

  // Handler for input change, updates the question/comment statement
  const handleInputQuestion = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].statement = e.target.value;
    setQuestions(updatedQuestions);
  };

  const handleInputAnswer = (e) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].answer = e.target.value;
    setQuestions(updatedQuestions);
  };

  // Handler for option changes, updates a specific option's value
  const handleOptionChange = (optionIndex, newOption) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = newOption;
    setQuestions(updatedQuestions);
  };

  // Handler to set the correct option for the question
  const setCorrectOption = (correctIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options = updatedQuestions[index].options.map(
      (option, i) => ({ ...option, isCorrect: i === correctIndex })
    );
    setQuestions(updatedQuestions);
  };

  // Handler to change the type of the question/comment
  const handleTypeChange = (newType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;

    // Reset options based on the new type
    if (newType === "Comment" && selectedTemplate === "Standard") {
      updatedQuestions[index].options = [];
    } else if (newType === "Question" && selectedTemplate === "Standard") {
      updatedQuestions[index].options = [
        { text: "", isCorrect: true }, // Default correct option
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ];
    } else if (newType === "Question" && selectedTemplate === "Multi levels") {
      updatedQuestions[index].answer = "";
    }

    setQuestions(updatedQuestions);
  };

  // Handler to delete the current question/comment
  const handleDelete = () => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  // Handler to add a new question/comment below the current one
  const handleAdd = () => {
    const newQuestion = {
      type: data.type, // Same type as current question/comment
      statement: "",
      options:
        data.type === "Question"
          ? [
              { text: "", isCorrect: true },
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
              { text: "", isCorrect: false },
            ]
          : [], // No options if type is "Comment"
    };
    const updatedQuestions = [
      ...questions.slice(0, index + 1),
      newQuestion,
      ...questions.slice(index + 1),
    ];
    setQuestions(updatedQuestions);
  };

  const handleLevelChange = (newLevel) => {
    // Create a copy of the questions array
    const updatedQuestions = [...questions];

    // Update the level of the specific question at the given index
    updatedQuestions[index].level = newLevel;

    // Update the state with the modified questions array
    setQuestions(updatedQuestions);
  };

  return (
    <div
      className={`flex flex-row items-center gap-5 text-primary-font py-4 ${
        index > 0 ? "border-t-[1px] border-primary-border" : ""
      }`}
    >
      {/* Display the index of the current question/comment */}
      <p className='mr-10 ml-8'>{index + 1}</p>
      {/* Dropdown to select between Question and Comment */}
      <Dropdown
        width='w-32'
        value={data.type}
        options={["Question", "Comment"]}
        setOptionValue={handleTypeChange}
      />
      {/* Dropdown to select Level */}
      {selectedTemplate === "Multi levels" && data.type === "Question" && (
        <Dropdown
          width='w-28'
          value={data.level}
          options={["Level 1", "Level 2", "Level 3", "Level 4", "Level 5"]}
          setOptionValue={handleLevelChange}
        />
      )}
      <div className='flex items-center gap-6 flex-1'>
        {/* Input field for question/comment statement */}
        <input
          type='text'
          value={data.statement}
          onChange={handleInputQuestion}
          className={`${
            selectedTemplate === "Multi levels" && data.type === "Question"
              ? "w-[18.5rem]"
              : "w-[28.5rem]"
          } h-8 bg-transparent border-2 border-primary-border rounded-md px-3 py-[2px] hover:border-accentIndigo focus:border-accentIndigo focus:outline-none`}
        />
        {/* Conditionally render options if type is "Question" */}
        {data.type === "Question" && selectedTemplate === "Standard" && (
          <div className='flex flex-col gap-3 mr-5'>
            {data.options.map((option, optionIndex) => (
              <Option
                key={optionIndex}
                option={option}
                isCorrect={option.isCorrect}
                onChange={(newOption) =>
                  handleOptionChange(optionIndex, newOption)
                }
                setCorrectOption={() => setCorrectOption(optionIndex)}
              />
            ))}
          </div>
        )}
        {
          // input value for the answer of multi levels question
          selectedTemplate === "Multi levels" && data.type === "Question" && (
            <InputText
              value={data.answer}
              onChange={handleInputAnswer}
              size='w-52 h-8'
            />
          )
        }
      </div>
      {/* Icon container for delete and add */}
      <div className='flex flex-row items-center gap-4'>
        {/* Trash icon to delete the question/comment */}
        <IconTrash
          size={30}
          className='text-white rounded-md p-1 hover:cursor-pointer hover:bg-[#3F424F]'
          onClick={handleDelete}
        />
        {/* Plus icon to add a new question/comment */}
        <IconPlus
          size={30}
          className='text-white rounded-md p-1 hover:cursor-pointer hover:bg-[#3F424F]'
          onClick={handleAdd}
        />
      </div>
    </div>
  );
};

export default QuestionComment;
