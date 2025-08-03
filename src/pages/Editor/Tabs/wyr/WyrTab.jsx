import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Settings from "./Settings";
import Content from "./Content";

const WyrTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      const filteredData = data
        .map((item) => {
          if (item.type === "Question") {
            // Return fields specific to "Question"
            return {
              type: item.type,
              optionA: item.optionA || null,
              optionB: item.optionB || null,
              imgURL: "", // Add imgURL field as empty string
            };
          } else if (item.type === "Comment") {
            // Return fields specific to "Comment"
            return {
              type: item.type,
              statement: item.statement || null,
              imageURL: "", // Add imgURL field as empty string
            };
          }
          return null; // Handle cases where type doesn't match
        })
        .filter(Boolean); // Remove any null entries

      // Update questions state with the filtered data
      setQuestions(filteredData);
    }
  }, [data]);

  // Initialize the settings state
  const [settings, setSettings] = useState({
    voice: {
      voiceSpeed: 35,
      voiceVolume: 30,
      voicePitch: 65,
    },
    layout: {
      bgA: "#D90100",
      bgB: "#0078CD",
      bgDivider: "#000000",
    },
    timer: {
      showTimer: true,
      timerColor: "#4CB117",
    },
    images: {
      showImages: true,
      radius: 0,
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      maxWidth: 59,
    },
    optionText: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
    },
    resultText: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      higherColor: "#4CB117",
      lowerColor: "#FFFFFF",
    },
    orText: {
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      orText: "Or",
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
    },
    sounds: {
      nextQuestion: true,
      nextQuestionVolume: 100,
      timer: true,
      timerVolume: 100,
      result: true,
      resultVolume: 100,
    },
  });
  
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Settings settings={settings} setSettings={setSettings}/>
        );
      case 1:
        return <Content questions={questions} setQuestions={setQuestions} />;
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

export default WyrTab;
