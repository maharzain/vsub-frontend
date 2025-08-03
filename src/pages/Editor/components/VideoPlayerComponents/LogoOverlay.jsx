import React, { useContext } from 'react';
import { AbsoluteFill } from 'remotion';

export const LogoOverlay = ({editorData}) => {
  const logo = editorData.tools.logo;

  if (!logo.imageURL) return null;

  const getPositionStyle = () => {
    switch (logo.position) {
      case 'Top Left':
        return { top: logo.paddingY + '%', left: logo.paddingX + '%' };
      case 'Top Right':
        return { top: logo.paddingY + '%', right: logo.paddingX + '%' };
      case 'Bottom Left':
        return { bottom: logo.paddingY + '%', left: logo.paddingX + '%' };
      case 'Bottom Right':
        return { bottom: logo.paddingY + '%', right: logo.paddingX + '%' };
      case 'Center':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default:
        return { top: 0, left: 0 };
    }
  };

  return (
    <AbsoluteFill>
      <img
        src={logo.imageURL}
        alt="Logo"
        style={{
          position: 'absolute',
          maxWidth: logo.size + '%',
          width: logo.size + '%',
          opacity: logo.opacity / 100,
          ...getPositionStyle(),
        }}
      />
    </AbsoluteFill>
  );
};