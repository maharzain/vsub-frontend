import { useContext } from "react";
import BorderButton from "../../../components/BorderButton";
import FilledButton from "../../../components/FilledButton";
import TableHead from "./TableHead";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import QuestionComment from "./QuestionComment";
import { WyrContext } from "../index";

const WyrQuestions = () => {
  // Retrieve questions, setQuestions, from WyrContext
  const { questions, setQuestions } = useContext(WyrContext);

  const addQuestion = () => {
    // Update the questions state by appending a new question object to the existing questions array
    setQuestions((prevQuestions) => [
      ...prevQuestions, // Spread the previous questions
      {
        type: "Question", // Set the type of the new entry to "Question"
        optionA: "", // Initialize the optionA of the question as an empty string
        optionB: "", // Initialize the optionB of the question as an empty string
        a: "", // Initialize the a of the question as an empty string
      },
    ]);
  };

  // Handler to add a new Comment to the questions list
  const addComment = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        type: "Comment",
        statement: "", // Initialize with an empty statement for Comment
      },
    ]);
  };

  return (
    <section>
      {/* Section for Generate Questions button */}
      <div className='flex justify-end'>
        <FilledButton type='button' size='2rem'>
          Generate questions
        </FilledButton>
      </div>

      {/* Questions Section */}
      <div className='max-xl:overflow-x-auto'>
        <div className='min-w-[1100px]'>
          {/* Table header for displaying question/comment details */}
          <TableHead
            headOne={"Type"}
            headTwo={"Option A"}
            headThree={"Option B"}
            headFour={"A% (optional)"}
          />

          <section className='border-b-[1px] border-primary-border flex flex-col gap-4 '>
            <div className='py-8'>
              {/* Conditionally render message or questions */}
              {questions.length === 0 ? (
                <p className='text-white font-bold text-center text-lg mt-4'>
                  Start by generating questions or adding them manually
                </p>
              ) : (
                questions.map((question, index) => (
                  // Render QuestionComment component for each question/comment
                  <QuestionComment key={index} index={index} data={question} />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Buttons Section */}
      <div className='mt-4 flex flex-col sm:flex-row sm:justify-end gap-4'>
        {/* Clear all questions */}
        <BorderButton
          type='button'
          onClick={() => {
            setQuestions([]); // Reset the questions array
          }}
        >
          <IconTrash size={20} />
          Clear
        </BorderButton>

        {/* Add a new Comment */}
        <BorderButton type='button' onClick={addComment}>
          <IconPlus size={20} />
          Add comment
        </BorderButton>

        {/* Add a new Question */}
        <BorderButton
          type='button'
          onClick={addQuestion} // Call the addQuestion function when the button is clicked}
        >
          <IconPlus size={20} />
          Add question
        </BorderButton>
      </div>
    </section>
  );
};

export default WyrQuestions;
