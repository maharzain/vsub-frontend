import { useState, useContext } from "react";
import { fakeTextContext } from "../index"; // Import the context to access the messages array and setMessages function
import { IconTrash, IconPlus } from "@tabler/icons-react"; // Import icons for use in buttons
import { chatSampleData } from "../../../constants/index"; // Import sample data for the chat
import BorderButton from "../../../components/BorderButton"; // Import custom button component
import MessageInput from "./MessageInput"; // Import the MessageInput component
import ToggleSwitch from "../../../components/ToggleSwitch";

const FakeTextMessages = () => {
  const { messages, setMessages } = useContext(fakeTextContext);
  const [globalEmphasize, setGlobalEmphasize] = useState(false);

  const addLeftMessage = () => {
    setMessages([
      ...messages,
      {
        type: "Left",
        content: {
          type: "Text",
          message: "",
        },
        emphasize: globalEmphasize, // Set initial emphasis based on global state
      },
    ]);
  };

  const addRightMessage = () => {
    setMessages([
      ...messages,
      {
        type: "Right",
        content: {
          type: "Text",
          message: "",
        },
        emphasize: globalEmphasize, // Set initial emphasis based on global state
      },
    ]);
  };

  const emptyArray = () => {
    setMessages([]);
  };

  const updateMessage = (index, updatedMessage) => {
    const newMessages = messages.map((message, i) =>
      i === index ? updatedMessage : message
    );
    setMessages(newMessages);
  };

  const removeMessage = (index) => {
    const newMessages = messages.filter((_, i) => i !== index);
    setMessages(newMessages);
  };

  const useSampleData = () => {
    setMessages(chatSampleData.map((msg) => ({ ...msg })));
  };

  const handleGlobalEmphasizeChange = (e) => {
    const isChecked = e.target.checked;
    setGlobalEmphasize(isChecked);

    // Update all messages' emphasis based on the global toggle
    setMessages(messages.map((msg) => ({ ...msg, emphasize: isChecked })));
  };

  return (
    <div>
      <div className='flex items-center justify-end'>
        <BorderButton type='button' onClick={useSampleData}>
          Use Sample Data
        </BorderButton>
        {/* Global Emphasize toggle */}
        <ToggleSwitch
          checked={globalEmphasize} // Use the global emphasize state
          onChange={handleGlobalEmphasizeChange} // Function to call when the checkbox value changes
        />
      </div>

      <ul className='text-primary-font bg-lightPurple flex mt-6 px-10 py-4 rounded-md'>
        <li className='border-l-2 border-tableBorder pl-2 w-[17%] ml-4'>
          Type
        </li>
        <li className='border-l-2 border-tableBorder pl-2 w-[65%]'>Content</li>
      </ul>

      {messages.length > 0 ? (
        messages.map((msg, index) => (
          <MessageInput
            key={index}
            index={index}
            messageData={msg}
            updateMessage={updateMessage}
            removeMessage={removeMessage}
            messages={messages} // Ensure this is passed
            setMessages={setMessages}
          />
        ))
      ) : (
        <div className='flex items-center justify-center py-8'>
          <p className='text-lg font-bold text-white'>
            Start by adding messages
          </p>
        </div>
      )}

      <div className='flex gap-4 justify-end mt-6'>
        <BorderButton type='button' onClick={emptyArray}>
          <IconTrash size={20} />
          Clear
        </BorderButton>

        <BorderButton type='button' onClick={addLeftMessage}>
          <IconPlus size={20} />
          Add Left
        </BorderButton>

        <BorderButton type='button' onClick={addRightMessage}>
          <IconPlus size={20} />
          Add Right
        </BorderButton>
      </div>
    </div>
  );
};

export default FakeTextMessages;
