import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Settings from "./Settings";
import Content from "./Content";
import VideoTab from "../../components/VideoTab";
import MusicTab from "../../components/MusicTab";

const QuizTab = ({ data, selectedTemplate }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [quiz, setQuiz] = useState([]);

  // Function to manipulate the received data
  const manipulateData = (data) => {
    return data.map((item) => {
      if (item.type === "Question") {
        return {
          ...item,
          bgImage: "https://dummyjson.com/image/100x300", // Add default or specific values here
          image: "https://dummyjson.com/image/300x100",
          questionVoiceProvider: "OpenAI",
          questionVoiceName: "Echo",
          answerVoiceProvider: "OpenAI",
          answerVoiceName: "Echo",
        };
      } else if (item.type === "Comment") {
        return {
          ...item,
          bgImage: "", // Add default or specific values here
          image: "",
          commentVoiceProvider: "OpenAI",
          commentVoiceName: "Echo",
        };
      }
      return item; // Return unchanged for other types
    });
  };

  // useEffect to manipulate and save the data in the quiz state when props change
  useEffect(() => {
    if (data && data.length > 0) {
      const manipulatedData = manipulateData(data);
      setQuiz(manipulatedData); // Save the manipulated data in the quiz state
    }
  }, [data]); // Run whenever receivedData changes

  // Initialize the settings state
  const [settings, setSettings] = useState({
    voice: {
      voiceSpeed: 35,
      voiceVolume: 30,
      voicePitch: 65,
    },
    qNo: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      box: true,
      boxColor: "#000000",
      boxPadding: 35,
      boxRadius: 0,
    },
    question: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      box: true,
      boxColor: "#000000",
      boxPadding: 35,
      boxRadius: 0,
    },
    questionImages: {
      showImages: true,
      imageRadius: 0,
      imageWidth: 35,
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
    },
    bgImages: {
      disableZooming: false,
      singleImage: false,
    },
    answers: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      box: true,
      boxColor: "#000000",
      boxPadding: 35,
      boxRadius: 0,
      correctColor: "#B52275",
      space: 40,
    },
    timer: {
      showTimer: true,
      bgColor: "#000000",
      color: "#B52275",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      duration: 3000,
    },
    comments: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      wordDisplay: "All",
    },
    layout: {
      paddingTop: 150,
      paddingX: 80,
    },
    video: {
      startsFrom: "",
      mute: false,
      files: [],
    },
    music: {
      volume: 40,
      musicFile: null,
    },
  });

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Settings settings={settings} setSettings={setSettings} />;
      case 1:
        return <Content quiz={quiz} setQuiz={setQuiz} selectedTemplate={selectedTemplate}/>;
      case 2:
        return <VideoTab settings={settings} setSettings={setSettings} />;
      case 3:
        return <MusicTab settings={settings} setSettings={setSettings} />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full relative'>
      <div className='absolute top-[40px] left-0 w-full border-b-[2px] border-primary-border mb-6'></div>

      {/* Tabs */}
      <div className='flex'>
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 0 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Settings
        </button>

        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 1 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Content
        </button>

        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 2 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Video
        </button>

        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 3 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Music
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className='p-5'
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default QuizTab;
