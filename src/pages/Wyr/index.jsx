import { useState, createContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import SearchMenu from "../../components/SearchMenu";
import searchIcon from "../../assets/images/searchIcon.svg";
import { languages, wyrTemplates } from "../../constants";
import TemplatesBox from "../../components/TemplatesBox";
import WyrTabUI from "./components/WyrTabUI";
import FilledButton from "../../components/FilledButton";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import WyrSvg from "../../../src/assets/images/splitScreen.svg";

export const WyrContext = createContext();

const Wyr = () => {
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");

  const [selectedTemplate, setSelectedTemplate] = useState(
    wyrTemplates[0].text
  );
  // Settings tab
  const [voiceProvider, setVoiceProvider] = useState("OpenAI");
  const [voiceInput, setVoiceInput] = useState("");
  const [voice, setVoice] = useState("Alloy");

  const [genBgImages, setGenBgImages] = useState(false);
  const [orVoice, setOrVoice] = useState("");

  // Questions tab
  const [type, setType] = useState("Question");
  const [questions, setQuestions] = useState([]);

  // Dummy state to check if user is a premium subscriber
  const [isPremium, setIsPremium] = useState(true); // false means not a premium subscriber
  const [proceed, setProceed] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLangInput(e.target.value);
  };

  useEffect(() => {
    // Set proceed to true if there is value in array
    setProceed(questions.length > 0);
  }, [questions]);

  const handleContinue = () => {
    if (!isPremium) {
      // Show error toast
      toast.error("Please subscribe to a paid plan.", {
        duration: 4000,
        position: "top-center",
      });
      return; // Stop further execution
    } else {
      setTimeout(() => {
        // navigate to the next page
        const uniqueKey = uuidv4(); // Generate a unique key
        const tabName = "Wyr"; // Set the tab name
        const img = WyrSvg; // Set the image
        navigate(`/workspace/editor/${uniqueKey}`, {
          state: { data: questions, name: tabName, img },
        });
      }, 1000); // Adjust timing if needed
    }
  };

  const values = {
    voiceProvider,
    setVoiceProvider,
    voiceInput,
    setVoiceInput,
    voice,
    setVoice,
    genBgImages,
    setGenBgImages,
    orVoice,
    setOrVoice,
    type,
    setType,
    questions,
    setQuestions,
  };

  return (
    <WyrContext.Provider value={values}>
      <Container>
        {/* <Toaster /> Toast component to render the notifications */}
        <h1 className='text-white text-xl font-extrabold mb-6 mt-12'>
          Create "Would you rather" video.{" "}
          <Link
            to={"https://vsub.io/guides/wyr.pdf"}
            className='text-base underline text-glowBlue hover:text-blue-400'
          >
            Guide
          </Link>
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
                onChange={handleInputChange}
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
          templateData={wyrTemplates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
        <div className='py-4' />
        {/* Tab UI */}
        <BorderBox>
          <WyrTabUI />
          <div className='flex justify-end mt-6'>
            <FilledButton
              size='2rem'
              proceed={proceed}
              onClick={handleContinue}
            >
              Continue
            </FilledButton>
          </div>
        </BorderBox>
        <div className='py-14' />
      </Container>
    </WyrContext.Provider>
  );
};

export default Wyr;
