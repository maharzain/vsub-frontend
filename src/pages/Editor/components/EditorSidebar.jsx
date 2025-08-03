import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconBadgeCc, IconPackage, IconPalette } from "@tabler/icons-react";
import CaptionsEditor from "../components/CaptionsEditor";
import ToolsTabUI from "../Tabs/ToolsTab/ToolsTabUI";
import StylesTab from "./stylesTab/StylesTab";
import StylesTabUI from "./stylesTab/StylesTabUI";

const EditorSidebar = ({ mainTab, name, img, tabName }) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return mainTab;
      case 1:
        return <CaptionsEditor />;
      case 2:
        return <StylesTabUI />;
      case 3:
        return <ToolsTabUI />;
      default:
        return null;
    }
  };

  return (
    <div className='w-full h-full flex gap-2'>
      {/* Tabs */}
      <div className='flex flex-col gap-4 justify-start w-24 h-full mt-3 pr-2  relative'>
        <div className='absolute top-0 w-full h-full right-0 border-r-[1px] border-primary-border mb-6' />
        <button
          className={`flex flex-col gap-1 items-center text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 0 && "bg-[#282B3A] rounded-lg"
          }`}
          onClick={() => setActiveTab(0)}
        >
          <img
            src={img}
            alt='logo'
            width={"30px"}
            height={"30px"}
            className='mb-1'
          />
          {name}
        </button>

        {/* Tab 2 */}
        <button
          className={`flex flex-col gap-1 items-center text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 1 && "bg-[#282B3A] rounded-lg"
          }`}
          onClick={() => setActiveTab(1)}
        >
          <IconBadgeCc size={30} />
          Subtitles
        </button>
        {/* Tab 3 */}
        {tabName === "FakeText" ||
        tabName === "Quiz" ||
        tabName === "Wyr" ? null : (
          <button
            className={`flex flex-col gap-1 items-center text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
              activeTab === 2 && "bg-[#282B3A] rounded-lg"
            }`}
            onClick={() => setActiveTab(2)}
          >
            <IconPalette size={30} />
            Styles
          </button>
        )}

        {/* Tab 4 */}
        <button
          className={`flex flex-col gap-1 items-center text-primary-font py-2 px-4 relative transition duration-500 focus:outline-none hover:text-darkIndigo ${
            activeTab === 3 && "bg-[#282B3A] rounded-lg"
          }`}
          onClick={() => setActiveTab(3)}
        >
          <IconPackage size={30} />
          Tools
        </button>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.5 }}
        className='p-1 w-[75%] md:p-5 md:w-[90%] lg:w-full'
      >
        {renderContent()}
      </motion.div>
    </div>
  );
};

export default EditorSidebar;
