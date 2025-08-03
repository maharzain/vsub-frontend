import { useState, useContext } from "react";
import FilledButton from "../../../../components/FilledButton";
import ImageUpload from "../../../../components/ImageUpload";
import IconBolt from "../../../../assets/images/IconBolt.svg";
import ImgGenModal from "../../components/ImgGenModal";
import { EditorContext } from "../..";

const Content = () => {
  const { editorData, setEditorData } = useContext(EditorContext);
  console.log(editorData);

  // Modal state and functions
  const [showModal, setShowModal] = useState(false);
  const [imagePrompt, setImagePrompt] = useState("");
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // Function to handle image upload, convert it to URL, and update the content state
  const handleImageChange = (dataIndex, imgIndex, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newImageURL = reader.result;

      // Create a new object for editorData to avoid direct mutation
      const updatedEditorData = {
        ...editorData,
        images: [...editorData.images], // Copy the images array
      };

      // Update the specific image URL within the images array
      updatedEditorData.images[dataIndex].images[imgIndex].image = newImageURL;

      setEditorData(updatedEditorData); // Update state with the new image URL
    };

    if (file) {
      reader.readAsDataURL(file); // Convert image file to base64 URL
    }
  };

  // Display a loading message or a placeholder until editorData is populated
  if (!editorData || !editorData.images) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {editorData?.images.map((item, dataIndex) => (
        <div key={dataIndex} className='mb-6'>
          <h1 className='text-primary-font mb-4'>{item.transcript}</h1>
          <div className='flex flex-wrap gap-6'>
            {/* Dynamically loop through images */}
            {item.images.map((img, imgIndex) => (
              <div key={imgIndex} className='flex flex-col gap-4'>
                <img
                  src={img.image}
                  alt={`Image ${imgIndex + 1}`}
                  className='w-40 h-60 object-cover rounded-lg shadow-lg'
                />
                <span className='flex items-center gap-2'>
                  {/* Pass a function that captures the current indices */}
                  <ImageUpload
                    name={`imageURL-${dataIndex}-${imgIndex}`} // Use unique name for each image
                    id={`image-upload-${dataIndex}-${imgIndex}`} // Use unique ID for each input
                    onChange={(e) => {
                      const file = e.target.files[0];
                      handleImageChange(dataIndex, imgIndex, file);
                    }}
                  />

                  <FilledButton
                    size='1.7rem'
                    bgColor='bg-[#2a3041]'
                    onClick={openModal}
                  >
                    <img src={IconBolt} alt='bolt icon' />
                  </FilledButton>
                  {/* ai prompt for image modal/popup */}
                  <ImgGenModal
                    showModal={showModal}
                    closeModal={closeModal}
                    imagePrompt={imagePrompt}
                    setImagePrompt={setImagePrompt}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Content;
