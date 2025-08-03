import React, { useContext } from 'react';
import CaptionsEditor from '../../components/CaptionsEditor'
import { EditorContext } from '../..';

const CaptionsTab = () => {
  const {tabData , setTabData , subtitles , editorData } = useContext(EditorContext);
  
  return (
    <div className='p-5 bg-primary-100 min-h-screen'>
      <CaptionsEditor />
    </div>
  );
};

export default CaptionsTab