import { useEffect, useContext , useState } from "react";
import BorderButton from "../../../components/BorderButton";
import FilledButton from "../../../components/FilledButton";
import TableHead from "../../../components/TableHead";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import QuestionComment from "./QuestionComment";
import { QuizContext } from "../index";
import GenQueModal from "./GenQueModal";

const QuizQuestions = () => {
  // Retrieve questions, setQuestions, and addQuestion from QuizContext
  const { questions, setQuestions, selectedTemplate } = useContext(QuizContext);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    // Clear the questions array whenever the selectedTemplate changes
    setQuestions([]);
  }, [selectedTemplate, setQuestions]);

  const addStandardQuestion = () => {
    // Update the questions state by appending a new question object to the existing questions array
    setQuestions((prevQuestions) => [
      ...prevQuestions, // Spread the previous questions
      {
        type: "Question", // Set the type of the new entry to "Question"
        statement: "", // Initialize the question statement as an empty string
        options: [
          // Initialize the options for the question
          { text: "", isCorrect: true }, // Option 1: empty text, not correct
          { text: "", isCorrect: false }, // Option 2: empty text, not correct
          { text: "", isCorrect: false }, // Option 3: empty text, not correct
          { text: "", isCorrect: false }, // Option 4: empty text, not correct
        ],
      },
    ]);
  };

  const addMultiLevelQuestion = () => {
    // Update the questions state by appending a new question object to the existing questions array
    setQuestions((prevQuestions) => [
      ...prevQuestions, // Spread the previous questions
      {
        type: "Question", // Set the type of the new entry to "Question"
        level: "Level 1", // Initialize the level of the question as "Level 1"
        statement: "", // Initialize the question statement as an empty string
        answer: "",
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
        <FilledButton type='button' size='2rem' onClick={openModal}>
          Generate questions
        </FilledButton>
      </div>

      <GenQueModal show={showModal} handleClose={closeModal} />

      {/* Questions Section */}
      <div className='max-xl:overflow-x-auto'>
        <div className='min-w-[1100px]'>
          {/* Table header for displaying question/comment details */}
          <TableHead
            headOne={"Type"}
            headTwo={"Question/Comment"}
            headThree={"Answers"}
            selectedTemplate={selectedTemplate}
          />

          <section className='border-b-[1px] border-primary-border flex flex-col gap-4 '>
            <div className='py-8'>
              {/* Conditionally render message or questions */}
              {questions.length === 0 ? (
                <p className='text-white font-bold text-center text-lg mt-4'>
                  Start by adding questions
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
          onClick={
            selectedTemplate === "Standard"
              ? addStandardQuestion
              : selectedTemplate === "Multi levels" && addMultiLevelQuestion
          }
        >
          <IconPlus size={20} />
          Add question
        </BorderButton>
      </div>
    </section>
  );
};

export default QuizQuestions;
