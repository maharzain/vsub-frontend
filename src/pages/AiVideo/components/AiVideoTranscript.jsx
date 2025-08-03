import React, { useContext } from "react";
import RadioSelection from "../../../components/RadioSelection";
import Music from "./Music";
import Standard from "./Standard";
import { AiVideoContext } from "../index";

const AiVideoTranscript = () => {
  const { videoType, setVideoType } = useContext(AiVideoContext);

  return (
    <div className='text-primary-font'>
      <p>Video type</p>
      <RadioSelection
        option={videoType}
        setOption={setVideoType}
        optionOne='Standard'
        optionTwo='Music video'
      />

      {videoType === "Standard" && <Standard />}

      {videoType === "Music video" && <Music />}
    </div>
  );
};

export default AiVideoTranscript;
