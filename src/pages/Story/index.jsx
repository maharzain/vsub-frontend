import { useState, createContext, useEffect } from "react";
import BorderBox from "../../components/BorderBox";
import Container from "../../components/Container";
import SearchMenu from "../../components/SearchMenu";
import searchIcon from "../../assets/images/searchIcon.svg";
import { languages } from "../../constants";
import FilledButton from "../../components/FilledButton";
import StoryTabUI from "./components/StoryTabUI";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import StorySvg from "../../../src/assets/images/storyBook.svg";
import axios from 'axios';

export const StoryContext = createContext();

const Story = () => {
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");
  // Transcript Tab
  const [transcript, setTranscript] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  // Settings Tab
  const [voiceProvider, setVoiceProvider] = useState("OpenAI");
  const [voiceInput, setVoiceInput] = useState("");
  const [voice, setVoice] = useState("Alloy");
  // Script Tab
  const [storyType, setStoryType] = useState("📜 Historical Stories");
  const [videoFile, setVideoFile] = useState(null);

  // continue btn
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(false);
  const navigate = useNavigate();

  const initiateStory = async () => {
    try {
      const response = await axios.post('/initiate-story', {
        message: {
          content: "Hello, this is a test message for the story.",
        },
        voiceProvider: voiceProvider.toLowerCase(), // Use the selected voice provider
        voice: voice.toLowerCase(), // Use the selected voice
      });

      // Handle the response
      console.log('Story initiated:', response.data);
      // You might want to update some state or show a success message here
    } catch (error) {
      console.error('Error initiating story:', error);
      // Handle errors, maybe show an error message to the user
    }
  };

  const handleLangChange = (e) => {
    setLangInput(e.target.value);
  };

  const handleTranscriptChange = (e) => {
    const value = e.target.value;
    if (value.length <= 8000) {
      setTranscript(value);
    }
  };

  const handleVoiceInputChange = (e) => {
    setVoiceInput(e.target.value);
  };

  useEffect(() => {
    if (transcript || audioFile) {
      setProceed(true);
    } else {
      setProceed(false); // Ensure proceed is false when conditions are not met
    }
  }, [transcript, audioFile]);

  const handleContinue = async () => {
    // If media is valid, check if the user is a premium subscriber
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return; // Stop further execution
    }
  
    // If all validations pass, proceed to the next page
    if (audioFile || (transcript && isPremium)) {
      try {
        // Send the request to initiate the story
        const response = await axios.post('/initiate-story', {
          message: {
            content: transcript || "Audio file uploaded", // Use transcript if available, otherwise a placeholder
          },
          voiceProvider: voiceProvider.toLowerCase(),
          voice: voice.toLowerCase(),
        });
  
        // Extract the ID from the response
        const uniqueKey = response.data.id;
        
        if (!uniqueKey) {
          return
        }
  
        const tabName = "story";
        const img = StorySvg;
  
        // Navigate to the next page with the received ID
        navigate(`/workspace/editor/${uniqueKey}`, {
          state: { data: language, name: tabName, img },
        });
  
      } catch (error) {
        console.error('Error initiating story:', error);
        toast.error("Failed to initiate story. Please try again.", {
          duration: 2000,
          position: "top-center",
        });
      }
    }
  };

  const ContextValues = {
    audioFile,
    setAudioFile,
    transcript,
    setTranscript,
    handleTranscriptChange,
    voiceProvider,
    setVoiceProvider,
    voiceInput,
    voice,
    setVoice,
    handleVoiceInputChange,
    storyType,
    setStoryType,
    videoFile,
    setVideoFile,
  };

  return (
    <StoryContext.Provider value={ContextValues}>
      <Container>
        <h1 className='text-primary-font text-xl font-extrabold mb-6 mt-12'>
          Create Story Videos
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
                onChange={handleLangChange}
                options={languages}
                selectedOption={language}
                setOptionValue={setLanguage}
              />
            </div>
          </div>
        </BorderBox>
        <div className='py-4' />
        <BorderBox>
          <StoryTabUI />
          {/* continue btn */}
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
        <div className='pb-16' />
      </Container>
    </StoryContext.Provider>
  );
};

export default Story;
