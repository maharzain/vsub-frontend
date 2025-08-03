import { useState, createContext, useEffect } from "react";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import RedditTabUI from "./components/RedditTabUI";
import IconBolt from "../../assets/images/IconBolt.svg";
import IconBoltDisabled from "../../assets/images/IconBoltDisabled.svg";
import FilledButton from "../../components/FilledButton";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import RedditSvg from "../../../src/assets/images/reddit.svg";

export const RedditContext = createContext();

const Reddit = () => {
  const [includeComments, setIncludeComments] = useState(false);
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");
  const [maxCharacters, setMaxCharacters] = useState("");
  const [postLink, setPostLink] = useState("");

  // continue btn
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (maxCharacters && postLink) {
      setProceed(true);
    } else {
      setProceed(false); // Ensure proceed is false when conditions are not met
    }
  }, [maxCharacters, postLink]);

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
    if (maxCharacters && postLink && isPremium) {
      setTimeout(() => {
        // navigate to the next page
        const uniqueKey = uuidv4(); // Generate a unique key
        const tabName = "Reddit"; // Set the tab name
        const img = RedditSvg; // Set the image
        navigate(`/workspace/editor/${uniqueKey}`, {
          state: { data:language, name: tabName, img },
        });
      }, 1000); // Adjust timing if needed
    }
  };

  const values = {
    includeComments,
    setIncludeComments,
    langInput,
    setLangInput,
    language,
    setLanguage,
    maxCharacters,
    setMaxCharacters,
    postLink,
    setPostLink,
  };

  return (
    <RedditContext.Provider value={values}>
      <Container>
        <h1 className='text-primary-font text-xl font-extrabold mb-6 mt-12'>
          Reddit post to video
        </h1>

        <BorderBox>
          <RedditTabUI />
          <div className='flex justify-end text-primary-font'>
            <FilledButton
              size='2rem'
              className='mt-6'
              proceed={proceed}
              onClick={handleContinue}
            >
              <img src={proceed ? IconBolt : IconBoltDisabled} alt='icon' />
              Apply magic
            </FilledButton>
          </div>
        </BorderBox>
        <div className='pb-20' />
      </Container>
    </RedditContext.Provider>
  );
};

export default Reddit;
