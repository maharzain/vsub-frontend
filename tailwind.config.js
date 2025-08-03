/* eslint-disable */
/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      "primary": "#111827",
      "primary-font": "#B2B8CD",
      "primary-border": "#2B3040",
      "accentPink": "#F11D64",
      "accentPink-2": "#fd3a95",
      "dimGray": "#dee1ea",
      "dimGray-2": "#b5bac1",
      "dimGray-3": "rgba(178, 184, 205, 0.08)",
      "dimGray-4": "#3A3D4A",
      "darkGray": "#464655",
      "darkPurple": "#181B25",
      "purple": "#242837",
      "lightPurple": "#242838",
      "borderBlue": "#15325B",
      "accentIndigo": "#7369DC",
      "darkIndigo": "#463fc6",
      "lightDimPurple": "#242837",
      "darkDimPurple": "#1f2330",
      "purpleBlack": "#1a1d29",
      "darkBlue": "#111a2c",
      "lightBlue": "#15325b",
      "obsidian": "#12141b",
      "darkGreen": "#122b23",
      "teal": "#1da2b7",
      "nightBlue": "#121a2b",
      "glowBlue": "#1e6be5",
      "purpleGray": "#232632",
      "charcoalGreen": "#162312",
      "deepMossGreen": "#274916",
      "transparent-black": "rgba(0, 0, 0, 0.70)",
      "inputBorder": "#262B3C",
      "tableBorder": "rgba(61, 64, 74, 0.4)",
      "iChatRight": "#32A1FC",
      "iChatLeft": "#E6E6EA",
      "WaChatRightLight": "#E6FFDA",
      "WaChatLeftLight": "#FFFFFF",
      "WaChatRightDark": "#005C4B",
      "WaChatLeftDark": "#383838",
      "igRightLight": "#2675FD",
      "igLeftLight": "#EEEFEE",
      "igRightDark": "#7743EA",
      "igLeftDark": "#262626",
      "btn-disabled": "#2C2F3A",
      "btn-disabled-text": "#61636B",
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      montserrat: ["Montserrat", 'sans-serif'],
      caveat: ["Caveat", "cursive"],
    },
  },
};
export const plugins = [
  require('daisyui'),
];
export const daisyui = {
  themes: false, // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  darkTheme: "dark", // name of one of the included themes for dark mode
  base: false, // applies background color and foreground color for root element by default
  styled: true, // include daisyUI colors and design decisions for all components
  utils: true, // adds responsive and modifier utility classes
  prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
  logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
  themeRoot: ":root", // The element that receives theme color CSS variables
};