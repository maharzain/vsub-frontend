import { useContext } from "react";
import { EditorContext } from "../..";
import isEqual from "lodash/isEqual";

const SubtitleTemplate = ({ styles, id }) => {
  const { editorData, setEditorData } = useContext(EditorContext);
  console.log(editorData.template);

  const handleClick = () => {
    // Create a new styles object by merging the clicked style with existing data
    const updatedEditorData = {
      ...editorData, // retain previous editor data
      template: styles,
    };

    // Update editorData in the context
    setEditorData(updatedEditorData);
  };

  return (
    <div className='flex flex-col items-center gap-3'>
      <span className='font-bold text-xl'>{styles.title}</span>
      <div
        onClick={handleClick} // Handle the click event
        className={`bg-[#272A39] w-72 h-44 px-16 rounded-3xl flex justify-center items-center hover:cursor-pointer ${isEqual(editorData.template, styles) ? "border-[4px] border-[#EA4293]" : ""}`}
      >
        <p style={styles} className={`text-center ${styles.templateFont}`}>
          {styles.sampleText}
        </p>
      </div>
    </div>
  );
};

export default SubtitleTemplate;
