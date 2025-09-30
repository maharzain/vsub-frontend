import React, { useState } from "react";
import Container from "../../components/Container";
import Notice from "../../components/Notice";
import { Link } from "react-router-dom";
import BorderBox from "../../components/BorderBox";
import SearchMenu from "../../components/SearchMenu";
import searchIcon from "../../assets/images/searchIcon.svg";
import {
  languages,
  charactersAndShows,
  brainTeaserTemplates,
} from "../../constants";
import TemplatesBox from "../../components/TemplatesBox";
import FilledButton from "../../components/FilledButton";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "../../constants/api.js";
import BrainSvg from "../../../src/assets/images/brain.png";

const Brain = () => {
  const [langInput, setLangInput] = useState("");
  const [language, setLanguage] = useState("English");

  const [mediaInput, setMediaInput] = useState("");
  const [media, setMedia] = useState("");

  const [selectedTemplate, setSelectedTemplate] = useState(
    brainTeaserTemplates[0].text
  );

  const [isPremium, setIsPremium] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLangInput(e.target.value);
  };

  const handleContinue = async () => {
    // First, validate the media input
    if (media === "") {
      toast.error("Please select a Cartoon/Movie", {
        duration: 4000,
        position: "top-center",
      });
      return; // Stop further execution
    }

    // If media is valid, check if the user is a premium subscriber
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 4000,
        position: "top-center",
      });
      return; // Stop further execution
    }

    // If all validations pass proceed to the next page
    if (media && language && selectedTemplate && isPremium) {
      setIsLoading(true);
      
      try {
        toast.loading("Creating your brain teaser video... Please wait", {
          id: "brain-processing",
          duration: Infinity,
        });

        const response = await axios.post('/initiate-brain', {
          language: language,
          media: media,
          selectedTemplate: selectedTemplate
        });

        if (response.data && response.data.id) {
          toast.dismiss("brain-processing");
          toast.success("Brain teaser video created successfully!");
          navigate(`/workspace/editor/${response.data.id}`);
        } else {
          toast.dismiss("brain-processing");
          toast.error('Failed to create brain teaser video');
        }
      } catch (error) {
        console.error('Error creating brain teaser video:', error);
        toast.dismiss("brain-processing");
        toast.error('Failed to create brain teaser video. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <div className='py-8'>
        <h1 className='text-xl font-extrabold mb-6 text-white'>
          {" "}
          Create brain teasers video
        </h1>

        <Notice bg={"bg-charcoalGreen"} borderColor={"border-deepMossGreen"}>
          <p>
            Learn how to create brain teaser videos with{" "}
            <Link
              to='https://www.youtube.com/watch?v=PC208eQoZv8'
              className=' text-glowBlue hover:text-blue-400'
            >
              tutorial
            </Link>
          </p>
        </Notice>
      </div>
      <BorderBox>
        {/* Language selection */}
        <p className='mb-2 text-primary-font'>Language</p>
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

        {/* Media selection */}
        <p className='mt-6 mb-2 text-primary-font'>Cartoon/Movie</p>
        <div className='relative'>
          <SearchMenu
            width={"w-72"}
            inputField={true}
            name={"language"}
            inputType={"text"}
            value={mediaInput}
            image={searchIcon}
            onChange={handleInputChange}
            options={charactersAndShows}
            selectedOption={media}
            setOptionValue={setMedia}
          />
        </div>
      </BorderBox>
      <div className='py-3' />
      {/* Templates Section */}
      <TemplatesBox
        templateData={brainTeaserTemplates}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
      />
      
      <div className='py-3' />
      <div className='flex justify-end pb-44'>
        <FilledButton 
          size='2rem' 
          onClick={handleContinue}
          proceed={!isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Creating video..." : "Continue"}
        </FilledButton>
      </div>
    </Container>
  );
};

export default Brain;
