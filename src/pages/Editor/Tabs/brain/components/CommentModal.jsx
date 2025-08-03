import { useState, useEffect } from "react";
import Dropdown from "../../../../../components/Dropdown";
import Modal from "../../../../../components/Modal";
import {
  trumpImages,
  bidenImages,
  harrisImages,
} from "../../../../../constants";
import InputText from "../../../../../components/InputText";
import FilledButton from "../../../../../components/FilledButton";

const CommentModal = ({ show, handleClose, setQuestions, questions }) => {
  const [characterName, setCharacterName] = useState("Donald Trump");
  const [selectedImage, setSelectedImage] = useState("");
  const [commentStatement, setCommentStatement] = useState("");
  const [proceed, setProceed] = useState(false);

  // Map the character name to the corresponding image arrays
  const characterImagesMap = {
    "Donald Trump": trumpImages,
    "Joe  Biden": bidenImages,
    "Kamala Harris": harrisImages,
  };

  // Get the images for the selected character
  const selectedImages = characterImagesMap[characterName];

  // Set the default selected image to the first image when characterName changes
  useEffect(() => {
    if (selectedImages && selectedImages.length > 0) {
      setSelectedImage(selectedImages[0]);
    }
  }, [characterName]);

  // Update proceed state based on commentStatement value
  useEffect(() => {
    if (commentStatement.trim().length > 0) {
      setProceed(true);
    } else {
      setProceed(false);
    }
  }, [commentStatement]);

  // Handle saving the new comment
  const handleSave = () => {
    const newComment = {
      type: "comment",
      characterName: characterName,
      characterImage: selectedImage, // Store selected image URL
      commentStatement: commentStatement,
      commentVoiceProvider: "OpenAI",
      commentVoiceName: "Echo",
    };

    // Update the questions array with the new comment
    setQuestions((prevQuestions) => [...prevQuestions, newComment]);

    // Reset the form values after saving
    setCharacterName("Donald Trump");
    setCommentStatement("");
    setSelectedImage(trumpImages[0]);
    handleClose();
  };

  return (
    <div>
      <Modal title='Add Comment' show={show} handleClose={handleClose}>
        <p className='text-primary-font py-2'>Character</p>

        <Dropdown
          width='w-44'
          value={characterName}
          options={["Donald Trump", "Joe  Biden", "Kamala Harris"]}
          setOptionValue={setCharacterName}
        />

        {selectedImages && selectedImages.length > 0 && (
          <div className='flex flex-wrap gap-6 mt-6'>
            {selectedImages.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer ${
                  selectedImage === image &&
                  "border-2 border-pink-500 rounded-md"
                }`}
                onClick={() => setSelectedImage(image)} // Set clicked image as selected
              >
                <img
                  src={image}
                  alt={`${characterName} comment`}
                  className='w-24 h-24 object-cover'
                />
              </div>
            ))}
          </div>
        )}

        <div className='mt-6'>
          <p className='text-primary-font font-bold mb-3'>Comment</p>
          <InputText
            value={commentStatement}
            name='commentStatement'
            onChange={(e) => setCommentStatement(e.target.value)}
            size='w-full'
          />
        </div>

        <div className='flex justify-end gap-4 mt-4'>
          <FilledButton
            size='2rem'
            bgColor='bg-[#2a3041] hover:bg-[#2a3041]'
            onClick={handleClose}
          >
            Cancel
          </FilledButton>
          <FilledButton
            size='2rem'
            bgColor='bg-[#2a3041] hover:bg-[#2a3041]'
            onClick={handleSave}
            proceed={proceed} // Disable the button if proceed is false
          >
            Generate voice & Save
          </FilledButton>
        </div>
      </Modal>
    </div>
  );
};

export default CommentModal;
