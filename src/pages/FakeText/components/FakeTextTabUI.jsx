import React, { useState } from "react";
import { motion } from "framer-motion";
import FakeTextSettings from "./FakeTextSettings";
import FakeTextLanguage from "./FakeTextLanguage";
import FakeTextScript from "./FakeTextScript";
import FakeTextTemplates from "./FakeTextTemplates";
import FakeTextMessages from "./FakeTextMessages";

const AiVideoTabUI = () => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return <FakeTextMessages />;
      case 1:
        return <FakeTextSettings />;
      case 2:
        return <FakeTextTemplates />;
      case 3:
        return <FakeTextLanguage />;
      case 4:
        return <FakeTextScript />;
      default:
        return null;
    }
  };

  return (
    <div className='md:w-full relative'>
      <div className='absolute top-[40px] left-0 w-full border-b-[2px] border-primary-border mb-6' />

      {/* Tabs */}
      <div className='flex flex-row flex-wrap'>
        {/* Tab 1 */}
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 0 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(0)}
        >
          Messages
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
          Templates
        </button>
        {/* Tab 4 */}
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 3 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(3)}
        >
          Language
        </button>
        {/* Tab 5 */}
        <button
          className={`text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 4 && "border-b-[2px] border-darkIndigo"
          }`}
          onClick={() => setActiveTab(4)}
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
