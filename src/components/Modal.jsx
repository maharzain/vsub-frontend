import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";

const Modal = ({
  title,
  show,
  handleClose,
  children,
  width = "w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-w-[90rem]",
}) => {
  // Define animation variants for the modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <AnimatePresence>
      {show && (
        <div className='fixed inset-0 flex items-center justify-center z-10'>
          {/* Backdrop with blur effect */}
          <motion.div
            className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition for backdrop
          />

          {/* Modal content */}
          <motion.div
            className={`relative bg-[#151822] rounded-lg shadow-lg p-6 ${width}`}
            initial='hidden'
            animate='visible'
            exit='hidden'
            variants={modalVariants}
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition for modal
          >
            <div className='flex justify-between items-center pb-3'>
              <h3 className='text-white text-lg font-semibold'>{title}</h3>
              <button
                onClick={handleClose}
                className='text-gray-500 hover:text-gray-700'
              >
                <IconX size={20} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
