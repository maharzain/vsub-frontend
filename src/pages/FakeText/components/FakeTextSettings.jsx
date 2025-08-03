import { useContext, useState } from "react";
import { fakeTextContext } from "../index";
import {
  voiceProviders,
  elevenLabVoices,
  openAiVoices,
} from "../../../constants/index";
import DropDown from "../../../components/Dropdown";
import SearchMenu from "../../../components/SearchMenu";
import searchIcon from "../../../assets/images/searchIcon.svg";
import { IconTrashFilled } from "@tabler/icons-react";
import InputText from "../../../components/InputText";

const FakeTextSettings = () => {
  const {
    leftVoiceProvider,
    setLeftVoiceProvider,
    rightVoiceProvider,
    setRightVoiceProvider,
    leftVoiceInput,
    setLeftVoiceInput,
    rightVoiceInput,
    setRightVoiceInput,
    leftVoice,
    setLeftVoice,
    rightVoice,
    setRightVoice,
    username,
    setUsername,
    instagramUserId,
    setInstagramUserId,
    image,
    setImage,
  } = useContext(fakeTextContext);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className='text-primary-font'>
      {/* left voice selection */}
      <section>
        <p className='mb-3'>Left Voice</p>
        <DropDown
          width={"w-44"}
          value={leftVoiceProvider}
          options={voiceProviders}
          setOptionValue={setLeftVoiceProvider}
        />

        <div className='my-2'>
          <SearchMenu
            width={`${
              leftVoiceProvider === "Elevenlabs"
                ? "w-[245px] sm:w-[34rem]"
                : "w-[245px]"
            }`}
            isVoice={leftVoiceProvider === "Elevenlabs" ? true : false}
            inputField={true}
            name={"voice"}
            inputType={"text"}
            value={leftVoiceInput}
            image={searchIcon}
            onChange={(e) => {
              setLeftVoiceInput(e.target.value);
            }}
            options={
              leftVoiceProvider === "Elevenlabs"
                ? elevenLabVoices
                : openAiVoices
            }
            selectedOption={leftVoice}
            setOptionValue={setLeftVoice}
          />
        </div>
      </section>

      {/* right voice selection */}

      <section>
        <p className='mt-5 mb-2'>Right Voice</p>
        <DropDown
          width={"w-44"}
          value={rightVoiceProvider}
          options={voiceProviders}
          setOptionValue={setRightVoiceProvider}
        />

        <div className='my-2'>
          <SearchMenu
            width={`${
              leftVoiceProvider === "Elevenlabs"
                ? "w-[245px] sm:w-[34rem]"
                : "w-[245px]"
            }`}
            isVoice={rightVoiceProvider === "Elevenlabs" ? true : false}
            inputField={true}
            name={"voice"}
            inputType={"text"}
            value={rightVoiceInput}
            image={searchIcon}
            onChange={(e) => {
              setRightVoiceInput(e.target.value);
            }}
            options={
              rightVoiceProvider === "Elevenlabs"
                ? elevenLabVoices
                : openAiVoices
            }
            selectedOption={rightVoice}
            setOptionValue={setRightVoice}
          />
        </div>
      </section>

      {/* usename */}
      <section className='mt-3'>
        <p className='mb-1'>Username</p>

        <InputText
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </section>

      {/* usename */}
      <section className='mt-3'>
        <p className='mb-1'>Instagram User ID</p>
        <InputText
          value={instagramUserId}
          onChange={(e) => setInstagramUserId(e.target.value)}
        />
      </section>

      {/* profile photo */}
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
        <section className='flex items-center gap-3 mt-4'>
          <img
            src={image}
            alt='profile'
            className='max-w-[70px] max-h-[70px] object-cover'
          />
          <div className='p-2 rounded-md hover:bg-[#363843] cursor-pointer'>
            <IconTrashFilled
              size={20}
              onClick={() => {
                setImage(null);
              }}
            />
          </div>
        </section>
      )}
    </div>
  );
};

export default FakeTextSettings;
