import { useState, useRef, useEffect } from "react";
import { IconAsterisk } from "@tabler/icons-react";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import SearchMenu from "../../components/SearchMenu";
import FilledButton from "../../components/FilledButton";
import IconChevronDown from "../../assets/images/IconChevronDown.svg";
import { languages } from "../../constants";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../constants/api.js";
import CaptionsSvg from "../../../src/assets/images/play.svg";
import VideoUpload from "../../components/VideoUpload";

const Captions = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
    }
  };

  const handleRemoveVideo = () => {
    setVideoFile(null);
  };

  useEffect(() => {
    setProceed(videoFile !== null && language !== "");
  }, [videoFile, language]);

  const handleContinue = async () => {
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    if (videoFile && language && isPremium) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('language', language);

        const response = await axios.post('/initiate-captions', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.data && response.data.id) {
          navigate(`/workspace/editor/${response.data.id}`);
        } else {
          throw new Error('Failed to initiate captions');
        }
      } catch (error) {
        console.error('Error initiating captions:', error);
        toast.error("Failed to upload video. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <h1 className='text-white text-xl font-extrabold mb-6 mt-12'>
        Add captions to video
      </h1>
      <BorderBox>
        <div className='mb-6 text-primary-font'>
          <span className='flex items-center mt-6 gap-[2px] mb-2'>
            <IconAsterisk size={10} style={{ color: "red" }} />
            <p>Spoken language</p>
          </span>
          <SearchMenu
            isVoice={false}
            width={"w-[260px]"}
            inputField={true}
            name={"language"}
            inputType={"text"}
            value={langInput}
            image={IconChevronDown}
            onChange={(e) => {
              setLangInput(e.target.value);
            }}
            options={languages}
            selectedOption={language}
            setOptionValue={setLanguage}
          />
        </div>

        <VideoUpload
          videoFile={videoFile}
          handleVideoUpload={handleVideoUpload}
          handleRemoveVideo={handleRemoveVideo}
          tiktokURL={false}
        />
        <div className="mt-4">
          <FilledButton
            type='button'
            size='1.8rem'
            proceed={proceed}
            onClick={handleContinue}
            disabled={isLoading || !proceed}
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </FilledButton>
        </div>
      </BorderBox>
      <div className='pb-64' />
    </Container>
  );
};

export default Captions;