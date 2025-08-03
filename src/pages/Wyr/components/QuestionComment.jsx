import { useContext } from "react";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import Dropdown from "../../../components/Dropdown";
import { WyrContext } from "../index";
import InputText from "../../../components/InputText";

const QuestionComment = ({ index, data }) => {
  // Access the questions and setQuestions function from the WyrContext
  const { questions, setQuestions } = useContext(WyrContext);

  // Handler for input change, updates the question/comment statement
  const handleInputChange = (e) => {
    const updatedQuestions = [...questions];
    if (data.type === "Question") {
      // Update options for a question
      updatedQuestions[index][e.target.name] = e.target.value;
    } else {
      // Update the statement for a comment
      updatedQuestions[index].statement = e.target.value;
    }
    setQuestions(updatedQuestions);
  };

  // Handler to change the type of the entry
  const handleTypeChange = (newType) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = newType;

    // Reset fields based on the new type
    if (newType === "Question") {
      updatedQuestions[index].optionA = "";
      updatedQuestions[index].optionB = "";
      updatedQuestions[index].a = "";
      delete updatedQuestions[index].statement; // Remove statement field for Question
    } else if (newType === "Comment") {
      updatedQuestions[index].statement = "";
      delete updatedQuestions[index].optionA; // Remove options fields for Comment
      delete updatedQuestions[index].optionB;
      delete updatedQuestions[index].a;
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
      ...(data.type === "Question"
        ? { optionA: "", optionB: "", a: "" }
        : { statement: "" }),
    };
    const updatedQuestions = [
      ...questions.slice(0, index + 1),
      newQuestion,
      ...questions.slice(index + 1),
    ];
    setQuestions(updatedQuestions);
  };

  return (
    <div
      className={`flex flex-row items-center gap-5 text-primary-font py-4 flex-1 ${
        index > 0 ? "border-t-[1px] border-primary-border" : ""
      }`}
    >
      {/* Display the index of the current question/comment */}
      <p className='mr-10 ml-8'>{index + 1}</p>

      <Dropdown
        width='w-32'
        value={data.type}
        options={["Question", "Comment"]}
        setOptionValue={handleTypeChange}
      />

      <div className='flex items-center flex-grow gap-6'>
        {/* Input fields for question options or comment statement */}
        {data.type === "Question" ? (
          <>
            <InputText
              name='optionA'
              size='w-[19rem] h-8'
              value={data.optionA}
              onChange={handleInputChange}
            />

            <InputText
              name='optionB'
              size='w-[19rem] h-8'
              value={data.optionB}
              onChange={handleInputChange}
            />

            <div className='flex items-center'>
              <div className='border-2 border-r-0 border-primary-border rounded-l-md ml-2 px-2 py-1'>
                <input
                  type='number'
                  name='a'
                  className='w-10 bg-transparent focus:outline-none focus:border-darkIndigo'
                  value={data.a || ""}
                  onChange={handleInputChange}
                />
              </div>
              <span className='bg-[#1E212B] border-2 border-primary-border px-3 rounded-r-md py-1'>
                %
              </span>
            </div>
          </>
        ) : (
          <InputText
            size='w-[20rem] h-8'
            value={data.statement || ""}
            onChange={handleInputChange}
          />
        )}
      </div>

      {/* Icon container for delete and add */}
      <div className='flex flex-row items-center gap-2'>
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
