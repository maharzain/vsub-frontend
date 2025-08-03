import React from "react";
import ColorPicker from "../../../components/ColorPicker";

const Layout = ({ settings, setSettings }) => {
  const layout = settings.layout;

  const handleColorChange = (newColor, name) => {
    setSettings((prev) => ({
      ...prev,
      layout: {
        ...prev.layout,
        [name]: newColor.hex,
      },
    }));
  };

  return (
    <div className='flex gap-6 flex-wrap'>
      {/* Background A */}
      <div className='flex items-center gap-3'>
        Background A
        <ColorPicker
          bg={layout.bgA}
          name='bgA'
          handleColorChange={handleColorChange}
        />
      </div>
      {/* Background B */}
      <div className='flex items-center gap-3'>
        Background B
        <ColorPicker
          bg={layout.bgB}
          name='bgB'
          handleColorChange={handleColorChange}
        />
      </div>
      {/* Divider Background*/}
      <div className='flex items-center gap-3'>
        Divider Background
        <ColorPicker
          bg={layout.bgDivider}
          name='bgDivider'
          handleColorChange={handleColorChange}
        />
      </div>
    </div>
  );
};

export default Layout;
