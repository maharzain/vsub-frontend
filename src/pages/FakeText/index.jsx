import { useState, createContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Container from "../../components/Container";
import Notice from "../../components/Notice";
import FakeTextTabUI from "./components/FakeTextTabUI";
import IphoneText from "./components/templates/IphoneText";
import IconBolt from "../../assets/images/IconBolt.svg";
import IconBoltDisabled from "../../assets/images/IconBoltDisabled.svg";
import FilledButton from "../../components/FilledButton";
import fakeTextSvg from "../../../src/assets/images/fakeText.svg";

export const fakeTextContext = createContext();

const FakeText = () => {
  // settings tab
  const [leftVoiceProvider, setLeftVoiceProvider] = useState("OpenAI");
  const [rightVoiceProvider, setRightVoiceProvider] = useState("OpenAI");

  const [leftVoiceInput, setLeftVoiceInput] = useState("");
  const [rightVoiceInput, setRightVoiceInput] = useState("");

  const [rightVoice, setRightVoice] = useState("Alloy");
  const [leftVoice, setLeftVoice] = useState("Echo");

  const [username, setUsername] = useState("unknown");
  const [instagramUserId, setInstagramUserId] = useState("unknown");
  const [image, setImage] = useState(null);
  // languages tab
  const [language, setLanguage] = useState("English");
  // script tab
  const [videoFile, setVideoFile] = useState(null);
  // FakeTextTemplates
  const [selectedTemplate, setSelectedTemplate] = useState(
    <IphoneText isTemplate={false} />
  );
  // fakeTextMessages tab
  const [messages, setMessages] = useState([]);
  // continue btn
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Set proceed to true if there is value in array
    setProceed(messages.length > 0);
  }, [messages]);

  const handleContinue = () => {
    // If the user is a premium subscriber
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return; // Stop further execution
    }
  
    // If all validations pass  proceed to the next page
    if (messages.length != 0 && isPremium) {
      setTimeout(() => {
        // navigate to the next page
        const uniqueKey = uuidv4(); // Generate a unique key
        const tabName = "FakeText"; // Set the tab name
        const img = fakeTextSvg; // Set the image
        navigate(`/workspace/editor/${uniqueKey}`, {
          state: { data:messages, name: tabName , img },
        });
      }, 1000); // Adjust timing if needed
    }
  };

  const values = {
    leftVoiceProvider,
    setLeftVoiceProvider,
    rightVoiceProvider,
    setRightVoiceProvider,
    leftVoiceInput,
    setLeftVoiceInput,
    rightVoiceInput,
    setRightVoiceInput,
    rightVoice,
    setRightVoice,
    leftVoice,
    setLeftVoice,
    username,
    setUsername,
    instagramUserId,
    setInstagramUserId,
    image,
    setImage,
    language,
    setLanguage,
    videoFile,
    setVideoFile,
    setSelectedTemplate,
    messages,
    setMessages,
  };

  return (
    <fakeTextContext.Provider value={values}>
      <Container>
        <h1 className='text-white text-xl font-extrabold mb-6 mt-12'>
          Create "Fake text message story" video.{" "}
          <Link
            to={"https://vsub.io/guides/fake-text.pdf"}
            className='text-base underline text-glowBlue hover:text-blue-400'
          >
            Guide
          </Link>
        </h1>

        <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
          Tip: Use uppercase text or punctuation marks to change the voice
          pitch.{" "}
          <Link
            to={"https://elevenlabs.io/docs/speech-synthesis/prompting#emotion"}
            className='text-base underline text-glowBlue hover:text-blue-400'
          >
            learn more
          </Link>
        </Notice>
        <section className='grid max-lg:grid-rows-2 xl:grid-cols-[68%_32%] gap-2 mt-4'>
          {/* Conversation Block */}
          <div className='border-2 rounded-lg border-[#2B3040] p-3 px-6 relative'>
            <h2 className='text-lg font-semibold text-primary-font mb-2'>
              Conversation
            </h2>
            <div className='absolute top-[60px] left-0 w-full border-b-2 border-[#2B3040] mb-6'></div>
            <div className='mt-10' />

            {/* Tabs */}
            <div>
              <FakeTextTabUI />
            </div>
          </div>

          {/* Preview Block */}

          <div className='max-md:w-[65%] border-2 rounded-lg border-[#2B3040] p-3 px-6 relative'>
            <h2 className='text-lg font-semibold text-primary-font mb-2'>
              Messages Preview
            </h2>
            <div className='underline-line absolute top-[60px] left-0 w-full border-b-2 border-[#2B3040] mb-6' />
            <div className='mt-10' />

            <div className='preview'>{selectedTemplate}</div>
          </div>
        </section>

        <div className='flex justify-end mt-4 mb-2'>
          <p className='text-primary-font'>
            Estimation: duration - 0s : credit cost - 0 credits
          </p>
        </div>

        <div className='flex justify-end mt-4 pb-36'>
          <FilledButton
            size='2rem'
            className='mt-6'
            proceed={proceed}
            onClick={handleContinue}
          >
            <img src={proceed ? IconBolt : IconBoltDisabled} alt='icon' />
            Create video
          </FilledButton>
        </div>
      </Container>
    </fakeTextContext.Provider>
  );
};

export default FakeText;
