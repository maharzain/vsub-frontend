import Modal from "../../../components/Modal";
import Notice from "../../../components/Notice";
import BorderButton from "../../../components/BorderButton";
import FilledButton from "../../../components/FilledButton";
import TextArea from "../../../components/TextArea";

const ImgGenModal = ({
  showModal,
  closeModal,
  imagePrompt,
  setImagePrompt,
}) => {
  return (
    <Modal title='Regenerate Image' show={showModal} handleClose={closeModal}>
      {/* ai prompt for image modal/popup */}
      <div className='mt-4'>
        <Notice bg='bg-darkBlue' borderColor='border-borderBlue'>
          Generating images could take a few minutes.
        </Notice>
      </div>
      {/* img gen prompt textarea */}
      <TextArea
        name='imagePrompt' // Unique name for the transcript input
        id='imagePrompt' // Unique id for the transcript input
        value={imagePrompt} // Set the current value from the transcript object
        height='min-h-32' // Set the height of the textarea
        onChange={(e) => {
          setImagePrompt(e.target.value);
        }} // Call handler to update transcript
      />

      <FilledButton size='1.9rem'>Generate</FilledButton>
      {/* controls */}
      <div className='flex justify-end mt-6 gap-2'>
        <BorderButton onClick={closeModal}>Cancel</BorderButton>
        <FilledButton proceed={imagePrompt.length > 0} size='1.9rem'>
          Change Image
        </FilledButton>
      </div>
    </Modal>
  );
};

export default ImgGenModal;
