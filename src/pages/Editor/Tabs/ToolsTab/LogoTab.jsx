import React, { useState, useContext } from "react";
import {
  IconBoxAlignBottomLeft,
  IconBoxAlignBottomRight,
  IconBoxAlignTopLeft,
  IconBoxAlignTopRight,
  IconKeyframeAlignCenter,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { EditorContext } from "../../index";
import NumberTagInput from "../../../../components/NumberTagInput";
import RangeSlider from "../../../../components/RangeSlider";

const LogoTab = () => {
  const { editorData, setEditorData } = useContext(EditorContext);
  const logo = editorData.tools.logo; // Accessing logo directly

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update editorData with the base64 image directly
        setEditorData((prevData) => ({
          ...prevData,
          tools: {
            ...prevData.tools,
            logo: {
              ...prevData.tools.logo,
              imageURL: reader.result, // Save the base64 string in imageURL
            },
          },
        }));
      };
      reader.readAsDataURL(file); // Convert image to base64
    }
  };

  const handleImageRemove = () => {
    setEditorData((prevData) => ({
      ...prevData,
      tools: {
        ...prevData.tools,
        logo: {
          ...prevData.tools.logo,
          imageURL: "", // Reset imageURL when the image is removed
        },
      },
    }));
  };

  const updatePosition = (newPosition) => {
    setEditorData((prevData) => ({
      ...prevData,
      tools: {
        ...prevData.tools,
        logo: {
          ...prevData.tools.logo,
          position: newPosition,
        },
      },
    }));
  };

  const handlePaddingChange = (field, value) => {
    setEditorData((prevData) => ({
      ...prevData,
      tools: {
        ...prevData.tools,
        logo: {
          ...prevData.tools.logo,
          [field]: value,
        },
      },
    }));
  };

  const handleSliderChange = (field, value) => {
    setEditorData((prevData) => ({
      ...prevData,
      tools: {
        ...prevData.tools,
        logo: {
          ...prevData.tools.logo,
          [field]: value,
        },
      },
    }));
  };

  return (
    <div className='text-primary-font'>
      {/* Logo upload section */}
      <p className='text-lg font-semibold mt-2'>Logo</p>
      {!logo.imageURL ? (
        <div className='mt-4'>
          <label
            htmlFor='image-upload'
            className='w-40 flex gap-2 border-2 border-primary-border rounded-md py-[7px] px-3 hover:cursor-pointer hover:border-accentIndigo hover:text-accentIndigo'
          >
            <IconUpload size={20} />
            Upload Logo
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
            src={logo.imageURL}
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

      {/* Logo Position Section */}
      <p className='text-lg font-semibold mt-4'>Position</p>

      <div className='grid grid-cols-2 gap-5 w-[18rem] mt-4 border-b-2 border-primary-border pb-4'>
        {/* Top Left */}
        <span
          className={`flex items-center gap-2 cursor-pointer ${
            logo.position === "Top Left" ? "text-pink-500" : "text-primary-font"
          }`}
          onClick={() => updatePosition("Top Left")}
        >
          <IconBoxAlignTopLeft size={20} />
          Top Left
        </span>

        {/* Top Right */}
        <span
          className={`flex items-center gap-2 cursor-pointer ${
            logo.position === "Top Right"
              ? "text-pink-500"
              : "text-primary-font"
          }`}
          onClick={() => updatePosition("Top Right")}
        >
          <IconBoxAlignTopRight size={20} />
          Top Right
        </span>

        {/* Bottom Left */}
        <span
          className={`flex items-center gap-2 cursor-pointer ${
            logo.position === "Bottom Left"
              ? "text-pink-500"
              : "text-primary-font"
          }`}
          onClick={() => updatePosition("Bottom Left")}
        >
          <IconBoxAlignBottomLeft size={20} />
          Bottom Left
        </span>

        {/* Bottom Right */}
        <span
          className={`flex items-center gap-2 cursor-pointer ${
            logo.position === "Bottom Right"
              ? "text-pink-500"
              : "text-primary-font"
          }`}
          onClick={() => updatePosition("Bottom Right")}
        >
          <IconBoxAlignBottomRight size={20} />
          Bottom Right
        </span>

        {/* Center */}
        <span
          className={`flex items-center gap-2 cursor-pointer ${
            logo.position === "Center" ? "text-pink-500" : "text-primary-font"
          }`}
          onClick={() => updatePosition("Center")}
        >
          <IconKeyframeAlignCenter size={20} />
          Center
        </span>
      </div>

      {/* Custom margins */}
      <p className='text-lg font-semibold mt-4'>Custom margins</p>
      <div className='flex flex-col gap-0 md:flex-row md:gap-10'>
        {/* Padding X */}
        <div className='flex flex-col gap-2 mt-4'>
          <p>PaddingX</p>
          <NumberTagInput
            tag='%'
            value={logo.paddingX}
            onChange={(e) => handlePaddingChange("paddingX", e.target.value)}
          />
        </div>

        {/* Padding Y */}
        <div className='flex flex-col gap-2 mt-4'>
          <p>PaddingY</p>
          <NumberTagInput
            tag='%'
            value={logo.paddingY}
            onChange={(e) => handlePaddingChange("paddingY", e.target.value)}
          />
        </div>
      </div>

      {/* Logo Size */}
      <div className='mt-8'>
        {/* Size slider */}
        <p className='font-semibold mb-3'>Size</p>
        <RangeSlider
          value={logo.size}
          onChange={(e) => handleSliderChange("size", e.target.value)}
        />

        {/* Opacity slider */}
        <p className='font-semibold mt-6 mb-3'>Opacity</p>
        <RangeSlider
          value={logo.opacity}
          onChange={(e) => handleSliderChange("opacity", e.target.value)}
        />
      </div>
    </div>
  );
};

export default LogoTab;
