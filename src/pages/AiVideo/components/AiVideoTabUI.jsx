import React, { useState } from "react";
import ScriptGen from "../../../components/ScriptGen";
import AiVideoTranscript from "./AiVideoTranscript";
import AiVideoSettings from "./AiVideoSettings";
import { motion } from 'framer-motion';


const AiVideoTabUI = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <AiVideoTranscript isAiVideoPage={true}/>;
      case 1:
        return <AiVideoSettings />;
      case 2:
        return <ScriptGen isAiVideoPage={true}/>;
      default:
        return null;
    }
  };

  return (
    <div className='w-full relative'>
      <div className='absolute top-[40px] left-0 w-full border-b-[2px] border-primary-border mb-6' />

      {/* Tabs */}
      <div className='flex'>
        {/* Tab 1 */}
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 0 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Transcript
        </button>

        {/* Tab 2 */}
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 1 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Settings
        </button>
        {/* Tab 3 */}
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 2 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(2)}
        >
          Script
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

export default AiVideoTabUI;
