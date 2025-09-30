import { useState, createContext, useEffect } from "react";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import SearchMenu from "../../components/SearchMenu";
import searchIcon from "../../assets/images/searchIcon.svg";
import { languages, quizTemplates, quizPresetPrompts } from "../../constants";
import TemplatesBox from "../../components/TemplatesBox";
import FilledButton from "../../components/FilledButton";
import QuizTabUI from "./Components/QuizTabUI";
import QuestionPreview from "./Components/QuestionPreview";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../constants/api.js";

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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleContinue = async () => {
    // If the user is a premium subscriber
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return; // Stop further execution
    }
  
    // If all validations pass proceed to the next page
    if (questions.length != 0 && isPremium) {
      setIsLoading(true);
      
      try {
        toast.loading("Creating your quiz... Please wait", {
          id: "quiz-processing",
          duration: Infinity,
        });

        const response = await axios.post('/initiate-quiz', {
          questions: questions,
          language: language,
          media: selectedTemplate,
          selectedTemplate: selectedTemplate,
          voiceProvider: voiceProvider,
          voice: voice
        });

        if (response.data && response.data.id) {
          toast.dismiss("quiz-processing");
          toast.success("Quiz created successfully!");
          navigate(`/workspace/editor/${response.data.id}`);
        } else {
          toast.dismiss("quiz-processing");
          toast.error('Failed to create quiz');
        }
      } catch (error) {
        console.error('Error creating quiz:', error);
        toast.dismiss("quiz-processing");
        toast.error('Failed to create quiz. Please try again.');
      } finally {
        setIsLoading(false);
      }
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
        
        {/* Question Preview - Show questions above template */}
        <QuestionPreview 
          questions={questions}
          selectedTemplate={selectedTemplate}
        />
        
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
