import { useState ,useEffect } from "react";
import Dropdown from "../../../../../components/Dropdown";
import Modal from "../../../../../components/Modal";
import {
  trumpQAImages,
  bidenQAImages,
  harrisQAImages,
} from "../../../../../constants";
import InputText from "../../../../../components/InputText";
import FilledButton from "../../../../../components/FilledButton";

const QuestionModal = ({ show, handleClose, setQuestions }) => {
  const [characterName, setCharacterName] = useState("Donald Trump");
  const [questionStatement, setQuestionStatement] = useState("");
  const [answerStatement, setAnswerStatement] = useState("");
  const [proceed, setProceed] = useState(false);

  // Map the character name to the corresponding image arrays
  const characterImagesMap = {
    "Donald Trump": trumpQAImages,
    "Joe  Biden": bidenQAImages,
    "Kamala Harris": harrisQAImages,
  };

  // Get the images for the selected character
  const selectedImages = characterImagesMap[characterName];

  // Handle saving the new question
  const handleSave = () => {
    const newQuestion = {
      type: "question",
      question: {
        characterName: characterName,
        questionImage: selectedImages[0].questionImage, // Store question image URL
        answerImage: selectedImages[0].answerImage, // Store answer image URL
        questionStatement: questionStatement,
        answerStatement: answerStatement,
      },
      voices: {
        questionVoiceProvider: "OpenAI",
        questionVoiceName: "Echo",
        answerVoiceProvider: "OpenAI",
        answerVoiceName: "Echo",
      },
      soundEffect: {
        characterName: "",
        characterImage: "",
        soundFile: "",
        duration: "",
        startsFrom: "",
      },
      sideComment: {
        characterName: "",
        characterImage: "",
        content: "",
        startsFrom: "",
      },
    };

    // Add the new question to the questions array
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    // Reset state values after saving
    setCharacterName("Donald Trump");
    setQuestionStatement("");
    setAnswerStatement("");

    handleClose();
  };

  useEffect(() => {
    if (
      questionStatement.trim().length > 0 &&
      answerStatement.trim().length > 0
    ) {
      setProceed(true);
    } else {
      setProceed(false);
    }
  }, [questionStatement, answerStatement]);

  return (
    <div>
      <Modal title='Add Question' show={show} handleClose={handleClose}>
        <p className='text-primary-font py-2'>Character</p>

        <Dropdown
          width='w-44'
          value={characterName}
          options={["Donald Trump", "Joe  Biden", "Kamala Harris"]}
          setOptionValue={setCharacterName}
        />

        {selectedImages && selectedImages.length > 0 && (
          <div className='flex flex-col gap-6 mt-6'>
            {selectedImages.map((image, index) => (
              <div key={index} className='flex gap-4'>
                <div>
                  <img
                    src={image.questionImage}
                    alt={`${characterName} question`}
                    className='w-24 h-24 object-cover'
                  />
                  <p className='text-primary-font'>Question Image</p>
                </div>

                <div>
                  <img
                    src={image.answerImage}
                    alt={`${characterName} answer`}
                    className='w-24 h-24 object-cover'
                  />
                  <p className='text-primary-font'>Answer Image</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='mt-6'>
          <p className='text-primary-font font-bold mb-3'>Question</p>
          <InputText
            value={questionStatement}
            name='questionStatement'
            onChange={(e) => setQuestionStatement(e.target.value)}
            size='w-full'
          />

          <p className='text-primary-font font-bold my-3'>Answer</p>
          <InputText
            value={answerStatement}
            name='answerStatement'
            onChange={(e) => setAnswerStatement(e.target.value)}
            size='w-full'
          />
        </div>

        <div className='flex justify-end gap-4 mt-4'>
          <FilledButton
            size='2rem'
            bgColor='bg-[#2a3041] hover:bg-[#2a3041]'
            onClick={handleClose}
          >
            Cancel
          </FilledButton>
          <FilledButton
            size='2rem'
            bgColor='bg-[#2a3041] hover:bg-[#2a3041]'
            onClick={handleSave}
            proceed={proceed}
          >
            Generate voice & Save
          </FilledButton>
        </div>
      </Modal>
    </div>
  );
};

export default QuestionModal;
