import React, { useState } from "react";
import { motion } from "framer-motion";
import Content from "./Content";
import VideoTab from "../../components/VideoTab";
import MusicTab from "../../components/MusicTab";

const RedditTab = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  // Initialize the settings state
  const [settings, setSettings] = useState({
    content: {
      commentImages: true,
      captions: false,
      voiceName: "Mathew, Male, US English",
      voiceSpeed: "100",
      audioFile: null,
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
  

  const [redditPost, setRedditPost] = useState({
    title: "Why I Can't Stop Talking to My Plants",
    content: "I've recently started talking to my plants, and let me tell you, they're great listeners! They never interrupt, and they always keep their leaves to themselves. If you're not talking to your plants, are you even living your best life? \n\nRemember, if your plants look sad, just give them a pep talk. Works wonders!",
    comments: [
      {
        id: 1,
        username: "PlantWhisperer",
        comment: "I knew I wasn't the only one! My ferns have the best gossip."
      },
      {
        id: 2,
        username: "CactusConnoisseur",
        comment: "Is it weird that I’ve named my cactus ‘Spike Lee’?"
      },
      {
        id: 3,
        username: "HerbivoreHumor",
        comment: "I tried talking to my herbs, but they just wanted to be sautéed."
      },
      {
        id: 4,
        username: "SucculentSilly",
        comment: "Every time I talk to my succulents, I feel like I'm getting a therapy session!"
      },
      {
        id: 5,
        username: "FernFiesta",
        comment: "Just wait until you start singing to them! They love a good show tune."
      },
      {
        id: 6,
        username: "DaisyDilemma",
        comment: "My plants are starting to think I'm crazy, but I’m okay with that!"
      },
      {
        id: 7,
        username: "VineVibes",
        comment: "What do you even say to a plant? 'You're looking greener today!'?"
      },
      {
        id: 8,
        username: "BloomingBanters",
        comment: "I told my fern a joke, and it totally leafed me hanging!"
      },
      {
        id: 9,
        username: "PotatoPhilosopher",
        comment: "If plants could talk back, would they tell us to water them less? Asking for a friend."
      },
      {
        id: 10,
        username: "RootsRock",
        comment: "I once had a chat with my tomato plant about life, and it was quite fruitful!"
      },
    ],
  });
  
  

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Content
            settings={settings}
            setSettings={setSettings}
            redditPost={redditPost}
            setRedditPost={setRedditPost}
          />
        );
      case 1:
        return <VideoTab settings={settings} setSettings={setSettings} />;
      case 2:
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
          Video
        </button>

        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 2 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(2)}
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

export default RedditTab;
