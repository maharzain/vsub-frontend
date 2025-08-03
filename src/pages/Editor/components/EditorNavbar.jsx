import {React, useContext, useState} from "react";
import {
  IconArrowBackUp,
  IconArrowDown,
  IconArrowForwardUp,
  IconArrowLeft,
  IconCloud,
} from "@tabler/icons-react";
import FilledButton from "../../../components/FilledButton";
import { Link } from "react-router-dom";
import { getPreviousAddress } from "../../../utils";
import { EditorContext } from "../index";
import axios from 'axios';

const EditorNavbar = ({ tabName, unique_key }) => {
  const { subtitles, editorData, tabData, duration } = useContext(EditorContext);
  const prevAddress = getPreviousAddress(tabName);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadVideo = async () => {
    setIsDownloading(true);
    try {
      const response = await axios.post('/workspace/generateVideo', {
        subtitles,
        editorData,
        tabData,
        duration
      }, {
        responseType: 'blob' // Important: This tells axios to treat the response as binary data
      });
      
      // Create a Blob from the response data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      
      // Create a link element and trigger the download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'generated_video.mp4'; // You can adjust the filename as needed
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      console.log('Video downloaded successfully');
    } catch (error) {
      console.error('Error generating/downloading video:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <nav className='navbar justify-between border-b-[1px] border-primary-border'>
      {/* left */}
      <div className='flex items-center gap-6'>
        <Link
          to={`/workspace/${prevAddress}`}
          className='flex items-center gap-2 bg-[#2C2F41] text-dimGray text-[0.5rem] sm:text-base font-normal rounded-md px-3 py-1'
        >
          <IconArrowLeft size={20} />
          Back
        </Link>

        <p className='max-md:hidden text-white'>
          {tabName} - {unique_key}
        </p>
      </div>

      {/* right */}

      <div className='flex gap-8 text-white'>
        {/* undo redo btns */}
        <div className='flex gap-2'>
          {/* <IconArrowBackUp
            size={30}
            className='hover:cursor-pointer bg-[#2C2F41] p-1 text-xl rounded-md'
          />
          <IconArrowForwardUp
            size={30}
            className='hover:cursor-pointer bg-[#2C2F41] p-1 text-xl rounded-md'
          /> */}
        </div>

        <div className='flex gap-4'>
          <IconCloud
            size={30}
            className='hover:cursor-pointer bg-[#2C2F41] p-1 text-xl rounded-md'
          />

<FilledButton 
            onClick={downloadVideo} 
            type='button' 
            size='2rem'
            disabled={isDownloading}
          >
            <IconArrowDown size={20} />
            {isDownloading ? 'Downloading...' : 'Download'}
          </FilledButton>
        </div>
      </div>
    </nav>
  );
};

export default EditorNavbar;
