import { IconTrash, IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import Dropdown from "../../../../components/Dropdown";
import NumberTagInput from "../../../../components/NumberTagInput";
import RangeSlider from "../../../../components/RangeSlider";
import InputText from "../../../../components/InputText";
import CheckBox from "../../../../components/CheckBox";

const MessageInput = ({ index, messageData, updateMessage }) => {
  const { type, content, notificationSound, volume, mute } = messageData;
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

  const handleNotificationSoundChange = (newSound) => {
    updateMessage(index, {
      ...messageData,
      notificationSound: newSound,
    });
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    updateMessage(index, {
      ...messageData,
      volume: newVolume, // Update volume directly in messageData
    });
  };

  const handleMuteChange = (fieldName, value) => {
    updateMessage(index, {
      ...messageData,
      [fieldName]: value, // Update mute directly in messageData
    });
  };

  return (
    <div className='text-primary-font flex items-center gap-4 py-4 relative'>
      <p className='max-md:hidden mr-6 ml-4'>{index + 1}</p>

      {content.type === "Text" ? (
        <div className='w-full flex flex-wrap justify-between gap-2'>
          <div className='flex flex-col gap-2'>
            <InputText
              value={content.message || ""}
              onChange={handleContentChange}
              size='w-32 lg:w-64'
            />

            <div className='flex flex-wrap gap-2'>
              <Dropdown
                width={"w-24"}
                value={type}
                options={["Left", "Right"]}
                setOptionValue={handleTypeChange}
              />

              <NumberTagInput />
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {/* notification sounds */}
            {/* <Dropdown
              width={"w-60"}
              value={notificationSound}
              options={["notification1", "notification2"]}
              setOptionValue={handleNotificationSoundChange}
            /> */}

            <div className='flex'>
              {/* <RangeSlider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={100}
                width='w-[70%]'
              /> */}
              <CheckBox
                label='Mute'
                fieldName='mute'
                checked={mute}
                onChange={handleMuteChange}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {!imagePreview ? (
            <div>
              <label
                htmlFor='image-upload'
                className='border-2 border-primary-border rounded-md py-[7px] px-3 mr-3 hover:cursor-pointer hover:border-accentIndigo hover:text-accentIndigo'
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
              <Dropdown
                width={"w-24"}
                value={type}
                options={["Left", "Right"]}
                setOptionValue={handleTypeChange}
              />
            </div>
          ) : (
            // image preview
            <div className='w-full flex flex-row justify-between items-center'>
              <div className='flex items-center gap-3'>
                <img
                  src={imagePreview}
                  alt='Preview'
                  className='mt-2 w-24 h-auto object-cover border-2 border-primary-border rounded-md'
                />

                <div className='flex flex-col gap-2'>
                  <Dropdown
                    width={"w-36"}
                    value={type}
                    options={["Left", "Right"]}
                    setOptionValue={handleTypeChange}
                  />
                  <NumberTagInput />
                </div>
                <IconTrash
                  size={20}
                  onClick={handleImageRemove}
                  className='hover:cursor-pointer'
                />
              </div>

                {/* notification sounds */}
              <div className='flex flex-col items-center gap-2'>
                {/* <Dropdown
                  width={"w-60"}
                  value={notificationSound}
                  options={["notification1", "notification2"]}
                  setOptionValue={handleNotificationSoundChange}
                /> */}
                <div className='flex'>
                  <RangeSlider
                    value={volume}
                    onChange={handleVolumeChange}
                    min={0}
                    max={100}
                    width='w-[70%]'
                  />
                  <CheckBox
                    label='Mute'
                    fieldName='mute'
                    checked={mute}
                    onChange={handleMuteChange}
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <div className='w-full border-[0.2px] border-primary-border absolute bottom-0' />
    </div>
  );
};

export default MessageInput;
