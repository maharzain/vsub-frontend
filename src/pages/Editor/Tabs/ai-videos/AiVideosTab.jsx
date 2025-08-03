import { useState , useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Content from "./Content";
import Settings from "./Settings";
import MusicTab from "../../components/MusicTab";
import { EditorContext } from "../../index";

const AiVideosTab = ({ data }) => {
  const { tabData, setTabData } = useContext(EditorContext);
  const [activeTab, setActiveTab] = useState(0);
  const [content, setContent] = useState([
    {
      heading: {
        dialogue:
          "The more you accept what you can't control , the more peace you'll find by focusing only on whatyou can change.",
        images: [
          "https://dummyjson.com/image/160x240",
          "https://dummyjson.com/image/160x240",
        ],
      },
    },
    {
      heading: {
        dialogue: "You'll free your mind from worry.",
        images: ["https://dummyjson.com/image/160x240"],
      },
    },
  ]);

  useEffect(() => {
    setTabData({
      ...tabData,
      voice: {
        voiceVolume: 30,
        voicePitch: 65,
      },
      effects: {
        particlesBg: true,
        transition: "Smooth",
      },
      music: {
        volume: 40,
        musicFile: null,
      },
    });
  }, []);

  if (tabData == 0) {
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <Content content={content} setContent={setContent} />;
      case 1:
        return <Settings settings={tabData} setSettings={setTabData} />;
      case 2:
        return <MusicTab settings={tabData} setSettings={setTabData} />;
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

export default AiVideosTab;
