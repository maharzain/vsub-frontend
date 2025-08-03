import { useState, useContext } from "react";
import RangeSlider from "../../../../components/RangeSlider";
import Notice from "../../../../components/Notice";
import { IconTrashFilled } from "@tabler/icons-react";
import NumberTagInput from "../../../../components/NumberTagInput";
import MessageInput from "./MessageInput";
import InputText from "../../../../components/InputText";
import CheckBox from "../../../../components/CheckBox";

const Settings = ({ messages, settings, setMessages, setSettings }) => {
  // Initialize state for messages with default values from `data`
  const [sliderValue, setSliderValue] = useState(50);
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState("username");
  const [instagramUserId, setInstagramUserId] = useState("instagramUserId");

  console.log(settings);

  // const [messages, setMessages] = useState(data);

  // console.log(typeof(messages.messages));

  // Initialize the settings state
  // const [settings, setSettings] = useState({
  //   leftVoice: {
  //     voiceSpeed: 1,
  //     voiceVolume: 30,
  //     voicePitch: 65,
  //   },
  //   rightVoice: {
  //     voiceSpeed: 1,
  //     voiceVolume: 30,
  //     voicePitch: 65,
  //   },
  //   messages: {
  //     delay: 500,
  //     animation: true,
  //     scale: 0,
  //   },
  // });

  // setting handlers

  // Handlers for different categories
  const handleGeneralChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        [field]: value,
      },
    }));
  };

  const handleLeftVoiceChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      leftVoice: {
        ...prev.leftVoice,
        [field]: parseInt(value, 10), // Ensure value is converted to an integer
      },
    }));
  };
  
  const handleRightVoiceChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      rightVoice: {
        ...prev.rightVoice,
        [field]: parseInt(value, 10), // Ensure value is converted to an integer
      },
    }));
  };
  

  const handleMessagesChange = (field, value) => {
    setSettings((prev) => ({
      ...prev,
      messages: {
        ...prev.messages,
        [field]: value,
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      updateProfileField("profilePhoto", URL.createObjectURL(file));
    }
  };

  const updateProfileField = (field, value) => {
    const updatedMessages = messages.map((message) => ({
      ...message,
      [field]: value,
    }));
    setMessages(updatedMessages);
  };

  const handleUsernameChange = (e) => {
    const newUsername = e.target.value;
    setUsername(newUsername);
    updateProfileField("username", newUsername);
  };

  const handleInstagramUserIdChange = (e) => {
    const newInstagramUserId = e.target.value;
    setInstagramUserId(newInstagramUserId);
    updateProfileField("instagramUserId", newInstagramUserId);
  };

  const updateMessage = (index, updatedMessage) => {
    const newMessages = messages.messages.map((message, i) =>
      i === index ? { ...message, ...updatedMessage } : message
    );
    setMessages({ ...messages, messages: newMessages });
  };

  const removeMessage = (index) => {
    const newMessages = messages.messages.filter((_, i) => i !== index);
    setMessages({ ...messages, messages: newMessages });
  };

  return (
    <div>
      <div className='join join-vertical w-full gap-4'>
        {/* General Settings */}
        <div className='collapse collapse-arrow join-item bg-[#1a212f]'>
          <input type='radio' name='my-accordion-4' />
          <div className='collapse-title text-lg text-primary-font font-medium'>
            General Settings
          </div>
          <div className='collapse-content flex items-center'>
            <CheckBox
              label='Full Screen'
              fieldName='fullScreen'
              checked={settings.general.fullScreen}
              onChange={handleGeneralChange}
            />
          </div>
        </div>

        {/* Left Voice Settings */}
        <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
          <input type='radio' name='my-accordion-4' />
          <div className='collapse-title text-lg text-primary-font font-medium'>
            Left Voice
          </div>
          <div className='collapse-content text-primary-font flex flex-col gap-4'>
            <Notice bg={"bg-[#2B2111]"} borderColor={"border-[#7a4d04]"}>
              Changing the volume to 100% or altering the voice pitch will only
              be applied during rendering. However, you can generate preview
              audio to test settings.
            </Notice>
            <RangeSlider
              value={settings.leftVoice.voiceSpeed}
              onChange={(e) =>
                handleLeftVoiceChange("voiceSpeed", e.target.value)
              } // Extracting the value
              min={0}
              max={5}
              label='Voice Speed'
            />

            <RangeSlider
              value={settings.leftVoice.voiceVolume}
              onChange={(e) =>
                handleLeftVoiceChange("voiceVolume", e.target.value)
              } // Extracting the value
              min={0}
              max={100}
              label='Voice Volume'
            />

            <RangeSlider
              value={settings.leftVoice.voicePitch}
              onChange={(e) =>
                handleLeftVoiceChange("voicePitch", e.target.value)
              } // Extracting the value
              min={0}
              max={100}
              label='Voice Pitch'
            />
          </div>
        </div>

        {/* Right Voice Settings */}
        <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
          <input type='radio' name='my-accordion-4' />
          <div className='collapse-title text-lg text-primary-font font-medium'>
            Right Voice
          </div>
          <div className='collapse-content flex flex-col gap-4'>
            <Notice bg={"bg-[#2B2111]"} borderColor={"border-[#7a4d04]"}>
              Changing the volume to 100% or altering the voice pitch will only
              be applied during rendering. However, you can generate preview
              audio to test settings.
            </Notice>
            <RangeSlider
              value={settings.rightVoice.voiceSpeed}
              onChange={(e) =>
                handleRightVoiceChange("voiceSpeed", e.target.value)
              } // Extracting the value
              min={0}
              max={5}
              label='Voice Speed'
            />

            <RangeSlider
              value={settings.rightVoice.voiceVolume}
              onChange={(e) =>
                handleRightVoiceChange("voiceVolume", e.target.value)
              } // Extracting the value
              min={0}
              max={100}
              label='Voice Volume'
            />

            <RangeSlider
              value={settings.rightVoice.voicePitch}
              onChange={(e) =>
                handleRightVoiceChange("voicePitch", e.target.value)
              } // Extracting the value
              min={0}
              max={100}
              label='Voice Pitch'
            />
          </div>
        </div>

        {/* Messages Tab */}
        {/* <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
          <input type='radio' name='my-accordion-4' />
          <div className='collapse-title text-lg text-primary-font font-medium'>
            Messages
          </div>
          <div className='collapse-content text-primary-font'>
            <h1 className='text-primary-font font-bold'>Voice</h1>
            <p className='my-2'>Delay between messages</p>
            <Notice bg={"bg-darkBlue"} borderColor={"border-lightBlue"}>
              Can be a negative number if the delay is not short enough.
            </Notice>
            <NumberTagInput
              value={settings.messages.delay}
              onChange={(e) => handleMessagesChange("delay", e.target.value)}
            />
            <h1 className='text-primary-font font-bold mt-3'>Layout</h1>
            <div className='flex items-center gap-1 my-2'>
              <label className='inline-flex label cursor-pointer'>
                <input
                  type='checkbox'
                  checked={!settings.messages.animation}
                  onChange={() =>
                    handleMessagesChange(
                      "animation",
                      !settings.messages.animation
                    )
                  }
                  className='checkbox checkbox-sm checkbox-primary mr-2'
                />
              </label>
              <p>Disable Animation</p>
            </div>
            <RangeSlider
              value={settings.messages.scale}
              onChange={(e) => handleMessagesChange("scale", e.target.value)}
              min={0}
              max={100}
              label='Scale'
            />
          </div>
        </div> */}

        {/* Profile Tab */}
        <div className='collapse collapse-arrow join-item border-gray-700 border-t bg-[#1a212f]'>
          <input type='radio' name='my-accordion-4' />
          <div className='collapse-title text-lg text-primary-font font-medium'>
            Profile
          </div>
          <div className='collapse-content'>
            <section className='mt-3'>
              <p className='mb-1'>Username</p>
              <InputText value={username} onChange={handleUsernameChange} />
            </section>

            <section className='mt-3'>
              <p className='mb-1'>Instagram User ID</p>
              <InputText
                value={instagramUserId}
                onChange={handleInstagramUserIdChange}
              />
            </section>

            {!image && (
              <section className='mt-3'>
                <p className='mb-3'>Profile photo</p>
                <label
                  htmlFor='profile-photo'
                  className='bg-transparent border-2 border-primary-border rounded-md px-3 py-2 hover:text-accentIndigo hover:border-accentIndigo hover:cursor-pointer'
                >
                  Change
                </label>
                <input
                  type='file'
                  accept='image/*'
                  id='profile-photo'
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </section>
            )}
            {image && (
              <section className='mt-3'>
                <img
                  src={image}
                  alt='Profile'
                  className='w-10 h-10 rounded-md'
                />
                <IconTrashFilled
                  size={24}
                  className='text-red-500 ml-2 hover:cursor-pointer'
                  onClick={() => setImage(null)}
                />
              </section>
            )}
          </div>
        </div>
      </div>

      <p className='mt-6 text-xl font-bold text-primary-font'>Messages</p>
      {messages?.messages &&
        messages.messages.map((msg, index) => (
          <MessageInput
            key={index}
            index={index}
            messageData={msg}
            updateMessage={updateMessage}
            messages={messages}
            setMessages={setMessages}
          />
        ))}
    </div>
  );
};

export default Settings;
