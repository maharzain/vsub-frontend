import { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BorderButton from "../../../components/BorderButton";
import FilledButton from "../../../components/FilledButton";
import { IconX } from "@tabler/icons-react";
import Notice from "../../../components/Notice";
import SearchMenu from "../../../components/SearchMenu";
import { languages } from "../../../constants";
import { QuizContext } from "../index";
import searchIcon from "../../../assets/images/searchIcon.svg";
import InputText from "../../../components/InputText";

const GenQueModal = ({ show, handleClose }) => {
  const { queLang, setQueLang, queTopic, setQueTopic } =
    useContext(QuizContext);
  const [langInput, setLangInput] = useState("");
  // Define animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      {show && (
        <div className='fixed inset-0 flex items-center justify-center'>
          {/* Backdrop with blur effect */}
          <motion.div
            className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          {/* Modal */}
          <motion.div
            className='relative bg-[#151822] rounded-lg shadow-lg p-6'
            style={{ width: "500px" }}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={modalVariants}
            transition={{ duration: 0.3 }}
          >
            {/* Modal header */}
            <div className='flex justify-between items-center pb-3'>
              <h3 className='text-lg font-semibold text-white'>
                Generate Questions
              </h3>
              <button
                onClick={handleClose}
                className='text-gray-500 hover:text-gray-700'
              >
                <IconX size={30} />
              </button>
            </div>
            {/* notice */}
            <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
              Sample topics: Taylor Swift, Geography, History,...
            </Notice>

            {/* language selection menu */}
            <div className='my-4 text-primary-font'>
              <p className='py-2'>Language</p>

              <SearchMenu
                width={"w-[450px]"}
                inputField={true}
                name={"language"}
                inputType={"text"}
                value={langInput}
                image={searchIcon}
                onChange={(e) => setLangInput(e.target.value)}
                options={languages}
                selectedOption={queLang}
                setOptionValue={setQueLang}
              />
            </div>

            {/* Topic menu */}
            <div className='my-4 text-primary-font'>
              <p className='py-2'>Topic</p>
              <InputText
                value={queTopic}
                size={"w-[450px] h-8"}
                onChange={(e) => setQueTopic(e.target.value)}
              />
            </div>

            {/* Modal Footer */}
            <div className='flex justify-end mt-6 gap-2'>
              <BorderButton onClick={handleClose}>Cancel</BorderButton>
              <FilledButton size='1.9rem'>Ok</FilledButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GenQueModal;
