import { useState } from "react";
import SearchMenu from "./SearchMenu";
import { audioVoices } from "../constants";
import searchIcon from "../assets/images/searchIcon.svg";

const Voice = () => {
  const [voiceInput, setVoiceInput] = useState("");
  const [voice, setVoice] = useState("Jasper");

  const handleInputChange = (e) => {
    setVoiceInput(e.target.value);
  };

  return (
    <div className="w-72">
      <SearchMenu
        width={"w-[35rem]"}
        inputField={true}
        name={"audio voice"}
        inputType={"text"}
        value={voiceInput}
        image={searchIcon}
        isVoice={true}
        onChange={handleInputChange}
        options={audioVoices}
        selectedOption={voice}
        setOptionValue={setVoice}
      />
    </div>
  );
};

export default Voice;
