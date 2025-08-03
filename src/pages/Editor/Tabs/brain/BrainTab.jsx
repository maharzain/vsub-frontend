import React, { useState } from "react";
import { motion } from "framer-motion";
import Content from "./Content";
import Settings from "./Settings";
import VideoTab from "../../components/VideoTab";
import MusicTab from "../../components/MusicTab";

const BrainTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [questions, setQuestions] = useState([]);
  
  // Initialize the settings state
  const [settings, setSettings] = useState({
    voice: {
      voiceSpeed: 35,
      voiceVolume: 30,
      voicePitch: 65,
    },
    levels: {
      levels: [
        {
          level: "Level 1",
          levelMode: "Easy",
          levelColor: "#31DB03",
        },
        {
          level: "Level 2",
          levelMode: "Medium",
          levelColor: "#FFE800",
        },
        {
          level: "Level 3",
          levelMode: "Hard",
          levelColor: "#FF1A02",
        },
        {
          level: "Level 4",
          levelMode: "Expert",
          levelColor: "#8919F8",
        },
        {
          level: "Level 5",
          levelMode: "Impossible",
          levelColor: "#D62B88",
        },
        {
          level: "Level 6",
          levelMode: "Hopeless",
          levelColor: "#D47711",
        },
        {
          level: "Level 7",
          levelMode: "Hopeless",
          levelColor: "#D47711",
        },
        {
          level: "Level 8",
          levelMode: "Hopeless",
          levelColor: "#D47711",
        },
        {
          level: "Level 9",
          levelMode: "Hopeless",
          levelColor: "#D47711",
        },
        {
          level: "Level 10",
          levelMode: "Hopeless",
          levelColor: "#D47711",
        },
      ],
      font: "Arial",
      fontSize: 55,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      bg: true,
      bgColor: "#000000",
    },
    timer: {
      soundName: "Sound Two",
      duration: 3000,
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
        return <Content questions={questions} setQuestions={setQuestions} />;
      case 1:
        return <Settings settings={settings} setSettings={setSettings} />;
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
          Content
        </button>

        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 1 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Settings
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

export default BrainTab;
