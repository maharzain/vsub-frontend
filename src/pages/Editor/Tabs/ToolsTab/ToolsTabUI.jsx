import React, { useState } from "react";
import { motion } from 'framer-motion';
import LogoTab from "./LogoTab";
import EmojiGifTab from "./EmojiGifTab";

const ToolsTabUI = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <LogoTab/>;
      case 1:
        return <EmojiGifTab/>;
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
          Logo
        </button>
        {/* <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 1 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Emoji/GIF
        </button> */}
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

export default ToolsTabUI;