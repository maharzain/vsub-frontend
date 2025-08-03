import { IconTrash, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import Dropdown from "../../../components/Dropdown";
import ToggleSwitch from "../../../components/ToggleSwitch";
import InputText from "../../../components/InputText";

const MessageInput = ({
  index,
  messageData,
  updateMessage,
  removeMessage,
  messages = [],
  setMessages,
}) => {
  const { type, content, emphasize } = messageData;
  const [imagePreview, setImagePreview] = useState(content.url || "");

  const handleTypeChange = (newType) => {
    updateMessage(index, {
      ...messageData,
      type: newType,
    });
  };

  const handleContentTypeChange = (newContentType) => {
    const updatedContent =
      newContentType === "Image"
        ? { type: "Image", url: content.url }
        : { type: "Text", message: content.message || "" };

    updateMessage(index, {
      ...messageData,
      content: updatedContent,
    });

    if (newContentType === "Text") {
      setImagePreview("");
    } else if (newContentType === "Image" && content.url) {
      setImagePreview(content.url);
    }
  };

  const handleContentChange = (e) => {
    updateMessage(index, {
      ...messageData,
      content: {
        ...content,
        message: e.target.value,
      },
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        updateMessage(index, {
          ...messageData,
          content: {
            type: "Image",
            url: reader.result,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview(null);
    updateMessage(index, {
      ...messageData,
      content: {
        type: "Image",
        url: "",
      },
    });
  };

  const handleEmphasizeChange = (e) => {
    updateMessage(index, {
      ...messageData,
      emphasize: e.target.checked,
    });
  };

  const addNewMessage = (index) => {
    const newMessage = {
      type: "Right",
      content: { type: "Text", message: "" },
      emphasize: false,
    };

    const updatedMessages = [...messages];
    updatedMessages.splice(index + 1, 0, newMessage);

    setMessages(updatedMessages);
  };

  return (
    <div className='text-primary-font flex items-center gap-4 py-4 relative'>
      <p className='mr-6 ml-4'>{index + 1}</p>

      <Dropdown
        width={"w-24"}
        value={type}
        options={["Left", "Right"]}
        setOptionValue={handleTypeChange}
      />

      <Dropdown
        width={"w-24 lg:w-32"}
        value={content.type}
        options={["Text", "Image"]}
        setOptionValue={handleContentTypeChange}
      />

      {content.type === "Text" ? (
        <InputText
          value={content.message || ""}
          onChange={handleContentChange}
          size='w-32 lg:w-80'
        />
      ) : (
        <>
          {!imagePreview ? (
            <div>
              <label
                htmlFor='image-upload'
                className='border-2 border-primary-border rounded-md py-[7px] px-3 hover:cursor-pointer hover:border-accentIndigo hover:text-accentIndigo'
              >
                Upload
              </label>
              <input
                type='file'
                accept='image/*'
                id='image-upload'
                onChange={handleImageChange}
                className='hidden w-80 border-2 border-primary-border rounded-md px-3 py-[2px] bg-transparent'
              />
            </div>
          ) : (
            <div className='flex items-center gap-2'>
              <img
                src={imagePreview}
                alt='Preview'
                className='mt-2 w-14 h-auto object-cover border-2 border-primary-border rounded-md'
              />
              <IconTrash
                size={20}
                onClick={handleImageRemove}
                className='hover:cursor-pointer'
              />
            </div>
          )}
        </>
      )}
      {/* local emphasize on message input */}
      <ToggleSwitch
        checked={emphasize || false} //local emphasize of message toggle
        onChange={handleEmphasizeChange} // onChange function to store state
      />

      <IconTrash
        className='w-8 h-8 text-primary-font hover:cursor-pointer p-1 hover:bg-[#3F424F] hover:rounded-md'
        size={30}
        onClick={() => removeMessage(index)}
      />

      <IconPlus
        className='w-8 h-8 text-primary-font hover:cursor-pointer p-1 hover:bg-[#3F424F] hover:rounded-md'
        size={30}
        onClick={() => addNewMessage(index)}
      />

      <div className='w-full border-[0.2px] border-primary-border absolute bottom-0' />
    </div>
  );
};

export default MessageInput;
