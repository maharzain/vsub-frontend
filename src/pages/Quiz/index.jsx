import { useState, createContext, useEffect } from "react";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import SearchMenu from "../../components/SearchMenu";
import searchIcon from "../../assets/images/searchIcon.svg";
import { languages, quizTemplates, quizPresetPrompts } from "../../constants";
import TemplatesBox from "../../components/TemplatesBox";
import FilledButton from "../../components/FilledButton";
import QuizTabUI from "./Components/QuizTabUI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import QuizSvg from "../../../src/assets/images/questionMark.svg";

export const QuizContext = createContext();

const Quiz = () => {
  // settings tab
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");

  const [voiceProvider, setVoiceProvider] = useState("OpenAI");
  const [voiceInput, setVoiceInput] = useState("");
  const [voice, setVoice] = useState("Alloy");

  const [genBgImages, setGenBgImages] = useState(false);
  const [genQueImages, setGenQueImages] = useState(false);

  const [selectedTemplate, setSelectedTemplate] = useState(
    quizTemplates[0].text
  );

  const [presetPrompt, setPresetPrompt] = useState(quizPresetPrompts[0]);
  const [customPrompt, setCustomPrompt] = useState("");

  // Questions tab
  const [type, setType] = useState("Question");
  const [questions, setQuestions] = useState([]);

  const [queLang, setQueLang] = useState("English");
  const [queTopic, setQueTopic] = useState("");

  // continue btn
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(false);

  const navigate = useNavigate();

  const handleLangInput = (e) => {
    setLangInput(e.target.value);
  };

  const handleVoiceInputChange = (e) => {
    setVoiceInput(e.target.value);
  };

  useEffect(() => {
    // Set proceed to true if there is value in array
    setProceed(questions.length > 0);
  }, [questions]);

  const handleContinue = () => {
    // If media is valid, check if the user is a premium subscriber
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return; // Stop further execution
    }

    // If all validations pass  proceed to the next page
    if (questions.length != 0 && isPremium) {
      setTimeout(() => {
        // navigate to the next page
        const uniqueKey = uuidv4(); // Generate a unique key
        const tabName = "Quiz"; // Set the tab name
        const img = QuizSvg; // Set the image
        const template = selectedTemplate; // Set the selected template
        navigate(`/workspace/editor/${uniqueKey}`, {
          state: { data: questions, name: tabName, img, template },
        });
      }, 1000); // Adjust timing if needed
    }
  };
  const contextValues = {
    voiceProvider,
    setVoiceProvider,
    voiceInput,
    voice,
    setVoice,
    handleVoiceInputChange,
    genBgImages,
    setGenBgImages,
    genQueImages,
    setGenQueImages,
    type,
    setType,
    questions,
    setQuestions,
    selectedTemplate,
    presetPrompt,
    setPresetPrompt,
    customPrompt,
    setCustomPrompt,
    queLang,
    setQueLang,
    queTopic,
    setQueTopic,
  };

  return (
    <QuizContext.Provider value={contextValues}>
      <Container>
        <h1 className='text-white text-xl font-extrabold mb-6 mt-12'>
          Create Quiz Videos.
        </h1>

        {/* Language Selection Menu */}
        <BorderBox>
          <div className='flex items-center gap-2'>
            <p className='text-primary-font '>Language:</p>
            <div className='relative'>
              <SearchMenu
                width={"w-44"}
                inputField={true}
                name={"language"}
                inputType={"text"}
                value={langInput}
                image={searchIcon}
                onChange={handleLangInput}
                options={languages}
                selectedOption={language}
                setOptionValue={setLanguage}
              />
            </div>
          </div>
        </BorderBox>
        <div className='py-3' />
        {/* Templates Selection Menu */}
        <TemplatesBox
          templateData={quizTemplates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          noticeText={"Changing template will clear all your questions"}
        />
        <div className='py-3' />
        <BorderBox>
          <QuizTabUI />
          <div className='flex justify-end mt-8'>
            <FilledButton
              type='button'
              size='1.8rem'
              proceed={proceed}
              onClick={handleContinue}
            >
              Continue
            </FilledButton>
          </div>
        </BorderBox>
        <div className='py-14' />
      </Container>
    </QuizContext.Provider>
  );
};

export default Quiz;
