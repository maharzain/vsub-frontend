import { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import SearchMenu from "../../components/SearchMenu";
import searchIcon from "../../assets/images/searchIcon.svg";
import { languages, aiVideoTemplates } from "../../constants";
import TemplatesBox from "../../components/TemplatesBox";
import AiVideoTabUI from "./components/AiVideoTabUI";
import FilledButton from "../../components/FilledButton";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AiVideosSvg from "../../../src/assets/images/aiVideo.svg";
import axios from "../../constants/api.js";
export const AiVideoContext = createContext();

const AiVideo = () => {
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");
  // Transcript Tab
  const [videoType, setVideoType] = useState("Standard");
  const [transcript, setTranscript] = useState("");
  const [audioFile, setAudioFile] = useState(null);

  // Settings Tab
  const [voiceProvider, setVoiceProvider] = useState("OpenAI");
  const [voiceInput, setVoiceInput] = useState("");
  const [voice, setVoice] = useState("Alloy");
  const [removeSilence, setRemoveSilence] = useState(false);
  const [videoSize, setVideoSize] = useState("Potrait (9:16)");

  // Script Tab
  const [storyType, setStoryType] = useState("📜 Historical Stories");
  const [videoFile, setVideoFile] = useState(null);

  const [selectedTemplate, setSelectedTemplate] = useState(
    aiVideoTemplates[0].text
  );
  // continue btn
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLangInput(e.target.value);
  };

  // Transcript Tab
  const handleAudioUpload = (e) => { 
    const file = e.target.files[0]; 
    if (file) { 
      const audioURL = URL.createObjectURL(file);
      setAudioFile(audioURL); 
    } 
  }

  // Settings Tab
  const handleVoiceInputChange = (e) => {
    setVoiceInput(e.target.value);
  };

  useEffect(() => {
    if (videoType === "Standard") {
      if (transcript || audioFile) {
        setProceed(true);
      } else {
        setProceed(false); // Ensure proceed is false when conditions are not met
      }
    } else if (videoType === "Music video") {
      if (transcript && audioFile) {
        setProceed(true);
      } else {
        setProceed(false); // Ensure proceed is false when conditions are not met
      }
    }
  }, [videoType, transcript, audioFile]);

  // continue btn
  const handleContinue = () => {
    // if the user is a premium subscriber
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return; // Stop further execution
    }

    // If all validations pass  proceed to the next page
    if (selectedTemplate && isPremium) {
      setIsLoading(true);
      setTimeout(() => {
        // navigate to the next page
        const uniqueKey = uuidv4(); // Generate a unique key
        const tabName = "Ai Videos"; // Set the tab name
        const img = AiVideosSvg; // Set the image
        sendVideoData()
      }, 1000); // Adjust timing if needed
    } else {
      toast.error("Please select a template.", {
        duration: 4000,
        position: "top-center",
      });
    }
  };
  const sendVideoData = async () => {
    const videoTypeValue = videoType === "Standard" ? 0 : 1;
    const [width, height] = videoSize === "Potrait (9:16)" ? [1080, 1920] : [1920, 1080];
  
    const formData = new FormData();
    formData.append("transcript", transcript);
    formData.append("videoStyleType", selectedTemplate);
    formData.append("videoType", videoTypeValue);
    formData.append("model", voiceProvider);
    formData.append("voice", voice);
    formData.append("width", width);
    formData.append("height", height);
  
    if (audioFile) {
      const audioBlob = await fetch(audioFile).then(r => r.blob());
      formData.append("audio", audioBlob, "audio.mp3");
    }
  
    try {
      // Show loading toast
      toast.loading("Video is being prepared... Please wait", {
        id: "video-processing",
        duration: Infinity,
      });

      const response = await axios.post("/initiate-ai-video", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Dismiss loading toast
      toast.dismiss("video-processing");

      if (response.data && response.data.id) {
        toast.success("Video ready! Redirecting to editor...", {
          duration: 2000,
          position: "top-center",
        });
        navigate(`/workspace/editor/${response.data.id}`);
      } else {
        throw new Error('Failed to initiate captions');
      }
      
      console.log("Server Response:", response.data);
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss("video-processing");
      toast.error("Failed to process video. Please try again.", {
        duration: 4000,
        position: "top-center",
      });
      console.error("Error initiating video:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const ContextValues = {
    videoType,
    setVideoType,
    audioFile,
    setAudioFile,
    transcript,
    setTranscript,
    handleAudioUpload,
    voice,
    setVoice,
    voiceProvider,
    setVoiceProvider,
    voiceInput,
    removeSilence,
    setRemoveSilence,
    videoSize,
    setVideoSize,
    storyType,
    videoFile,
    setVideoFile,
    setStoryType,
    handleVoiceInputChange,
  };

  return (
    <AiVideoContext.Provider value={ContextValues}>
      <Container className='relative'>
        <h1 className='text-xl font-extrabold mb-6 mt-12 text-white'>
          Create AI videos.{" "}
          <Link
            to={"https://www.youtube.com/watch?v=PC208eQoZv8"}
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
          templateData={aiVideoTemplates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />

        <div className='py-3' />

        <BorderBox>
          <AiVideoTabUI />
          <div className='flex justify-end mt-8'>
            <FilledButton
              type='button'
              size='2rem'
              proceed={proceed && !isLoading}
              onClick={handleContinue}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue"}
            </FilledButton>
          </div>
        </BorderBox>
        <div className='py-14' />
      </Container>
    </AiVideoContext.Provider>
  );
};

export default AiVideo;
