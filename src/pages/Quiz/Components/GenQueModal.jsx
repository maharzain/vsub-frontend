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
import axios from "../../../constants/api.js";
import { toast } from "react-hot-toast";

// Function to parse generated quiz content into question objects
const parseGeneratedQuizContent = (content) => {
  const questions = [];
  
  try {
    // Split content by question patterns (looking for numbered questions)
    const questionBlocks = content.split(/(?=\d+\.|\n\d+\.)/g).filter(block => block.trim());
    
    questionBlocks.forEach((block) => {
      const lines = block.trim().split('\n').filter(line => line.trim());
      if (lines.length === 0) return;
      
      // Extract question text (first line after removing number)
      let questionText = lines[0].replace(/^\d+\.\s*/, '').trim();
      if (!questionText) return;
      
      // Find options in the block
      const options = [];
      let correctAnswerIndex = 0;
      
      lines.forEach((line, lineIndex) => {
        const optionMatch = line.match(/^[A-D][).]\s*(.+)/i);
        if (optionMatch) {
          const optionText = optionMatch[1].trim();
          // Check if this line or nearby lines indicate correct answer
          const isCorrect = line.toLowerCase().includes('correct') || 
                           (lineIndex < lines.length - 1 && lines[lineIndex + 1].toLowerCase().includes('correct')) ||
                           line.includes('*') || line.includes('✓');
          
          if (isCorrect) correctAnswerIndex = options.length;
          
          options.push({
            text: optionText,
            isCorrect: false
          });
        }
      });
      
      // If we found options, mark the correct one
      if (options.length >= 2) {
        if (options[correctAnswerIndex]) {
          options[correctAnswerIndex].isCorrect = true;
        } else {
          // Default to first option if no correct answer found
          options[0].isCorrect = true;
        }
        
        questions.push({
          type: "Question",
          statement: questionText,
          options: options
        });
      }
    });
    
  } catch (error) {
    console.error('Error parsing quiz content:', error);
  }
  
  return questions;
};

const GenQueModal = ({ show, handleClose }) => {
  const { queLang, setQueLang, queTopic, setQueTopic, setQuestions } =
    useContext(QuizContext);
  const [langInput, setLangInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleGenerate = async () => {
    // Validate inputs
    if (!queTopic.trim()) {
      toast.error("Please enter a topic", {
        duration: 4000,
        position: "top-center",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      toast.loading("Generating quiz questions... Please wait", {
        id: "quiz-processing",
        duration: Infinity,
      });

      const response = await axios.post('/initiate-quiz', {
        language: queLang,
        media: queTopic,
        selectedTemplate: "Quiz Questions"
      });

      if (response.data && response.data.content) {
        // Parse the generated content and create questions
        const generatedContent = response.data.content;
        
        // Parse the generated content to extract questions and options
        const newQuestions = parseGeneratedQuizContent(generatedContent);
        
        if (newQuestions.length > 0) {
          setQuestions(prevQuestions => [...prevQuestions, ...newQuestions]);
        } else {
          // Fallback if parsing fails
          const fallbackQuestion = {
            type: "Question",
            statement: `Generated question about ${queTopic} in ${queLang}`,
            options: [
              { text: "Option A", isCorrect: true },
              { text: "Option B", isCorrect: false },
              { text: "Option C", isCorrect: false },
              { text: "Option D", isCorrect: false }
            ]
          };
          setQuestions(prevQuestions => [...prevQuestions, fallbackQuestion]);
        }
        
        toast.dismiss("quiz-processing");
        toast.success("Quiz questions generated successfully!");
        handleClose();
      } else {
        toast.dismiss("quiz-processing");
        toast.error('Failed to generate quiz questions');
      }
    } catch (error) {
      console.error('Error generating quiz questions:', error);
      toast.dismiss("quiz-processing");
      toast.error('Failed to generate quiz questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

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
              <FilledButton 
                size='1.9rem' 
                onClick={handleGenerate}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Ok"}
              </FilledButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GenQueModal;
