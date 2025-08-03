import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { EditorContext } from "../../index";
import StylesTab from "./StylesTab";
import SubtitleTemplates from "./SubtitleTemplates";

const StylesTabUI = () => {
  const { tabData, setTabData } = useContext(EditorContext);
  const [activeTab, setActiveTab] = useState(0);

  // tabs rendering
  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <StylesTab />;
      case 1:
        return (
          <SubtitleTemplates settings={tabData} setSettings={setTabData} />
        );
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
          Styles
        </button>

        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 1 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(1)}
        >
          Templates
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

export default StylesTabUI;
