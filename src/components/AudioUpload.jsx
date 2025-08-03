import { useRef } from "react";
import { IconUpload, IconX } from "@tabler/icons-react";

const AudioUpload = ({
  label,
  title = "Upload audio",
  audioFile,
  handleAudioUpload,
  handleRemoveAudio,
}) => {
  const fileInputRef = useRef(null);

  return (
    <div>
      {!audioFile && (
        <div>
          {label && <p className='mt-4'>Or use audio file</p>}
          <input
            type='file'
            accept='audio/*'
            id='audio-upload'
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAudioUpload}
          />
          <label
            htmlFor='audio-upload'
            style={{ minHeight: "1.8rem", height: "1.8rem" }}
            className='btn bg-purpleBlack hover:bg-purpleBlack hover:border-accentIndigo hover:text-accentIndigo border-[0.5px] border-darkIndigo text-darkIndigo text-[1rem] sm:text-base font-normal rounded-md mt-4'
          >
            <IconUpload size={20} />
            <span>{title}</span>
          </label>
        </div>
      )}

      {label && audioFile && <p className='mt-2'>Start with audio file</p>}

      {audioFile && (
        <div className='mt-4 inline-flex items-center space-x-2 bg-purpleGray text-primary-font py-0 px-3 rounded-md'>
          <span>{"audio"}.mp3</span>
          <IconX
            size={20}
            className='cursor-pointer'
            onClick={handleRemoveAudio}
          />
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
