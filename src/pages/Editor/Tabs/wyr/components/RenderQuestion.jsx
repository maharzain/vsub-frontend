import { useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import FilledButton from "../../../../../components/FilledButton";
import IconBolt from "../../../../../assets/images/IconBolt.svg";
import ImageUpload from "../../../../../components/ImageUpload";
import ImgGenModal from "../../../components/ImgGenModal";
import InputText from "../../../../../components/InputText";

const RenderQuestions = ({ index, questions, setQuestions }) => {
  const currentQuestion = questions[index];

  // Modal state and functions
  const [showModal, setShowModal] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Handler for input change, updates either question options or comment statement
  const handleInputChange = (e) => {
    const updatedQuestions = [...questions];
    const { name, value } = e.target;

    if (currentQuestion.type === "Question") {
      updatedQuestions[index][name] = value; // Update optionA, optionB, or other fields
    } else {
      updatedQuestions[index].statement = value; // Update the comment's statement
    }

    setQuestions(updatedQuestions); // Update the questions state
  };

  // Handler for input change for image
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    const updatedQuestions = [...questions]; // Make a copy of the questions array
    const name = "imageURL"; // Set the name of the image URL field

    if (file) {
      const reader = new FileReader();

      // When file reading is finished, convert to data URL
      reader.onloadend = () => {
        const imageDataUrl = reader.result;
        updatedQuestions[index][name] = imageDataUrl; // Update imageURL in the current question
        setQuestions(updatedQuestions); // Update the questions state after image is processed
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  // Handler to delete the current question/comment
  const handleDelete = () => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions); // Remove the item from the array
  };

  return (
    <div className='flex flex-row items-center flex-wrap gap-5 py-4 flex-1 border-b-[1px] border-primary-border'>
      <p className=''>{index + 1}</p>

      <div className='flex items-center flex-wrap gap-6'>
        {currentQuestion.type === "Question" ? (
          <>
            <div className='flex flex-col gap-4'>
              <InputText
                value={currentQuestion.optionA || ""}
                name='optionA'
                size='max-w-[20.2rem] h-8'
                onChange={handleInputChange}
              />

              <InputText
                value={currentQuestion.optionB || ""}
                name='optionB'
                size='max-w-[20.2rem] h-8'
                onChange={handleInputChange}
              />
            </div>

            {/* Display image if available */}
            {currentQuestion.imageURL && (
              <img
                src={currentQuestion.imageURL}
                alt='img'
                className='mt-2 w-24 h-auto object-cover border-2 border-primary-border rounded-md'
              />
            )}
          </>
        ) : (
          <>
            <InputText
              value={currentQuestion.statement || ""}
              name='statement'
              size='max-w-[20rem] h-8'
              onChange={handleInputChange}
            />

            {/* Display image if available */}
            {currentQuestion.imageURL && (
              <img
                src={currentQuestion.imageURL}
                alt='img'
                className='mt-2 w-24 h-auto object-cover border-2 border-primary-border rounded-md'
              />
            )}
          </>
        )}
      </div>

      <div className='flex items-center gap-2'>
        {/* image changing btn */}
        <ImageUpload
          name={`imageURL-${index}`} // Use unique name for each image
          id={`image-upload-${index}`} // Use unique ID for each input
          onChange={handleImageChange}
        />
        {/* image change using ai btn*/}
        <FilledButton
          bgColor='bg-[#2A3041] hover:bg-[#2A3041]'
          size='1.8rem'
          onClick={openModal}
        >
          <img src={IconBolt} alt='bold' />
        </FilledButton>
        {/* image change prompo popup/modal */}
        <ImgGenModal
          showModal={showModal}
          closeModal={closeModal}
          imagePrompt={imagePrompt}
          setImagePrompt={setImagePrompt}
        />
        {/* delete data at current index */}
        <IconTrash
          size={30}
          className='text-white p-1 hover:cursor-pointer hover:bg-[#3F424F]'
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default RenderQuestions;
