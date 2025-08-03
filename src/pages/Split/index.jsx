import { useState, createContext, useEffect } from "react";
import Container from "../../components/Container";
import BorderBox from "../../components/BorderBox";
import SplitTabUI from "./Components/SplitTabUI";
import FilledButton from "../../components/FilledButton";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SplitSvg from "../../../src/assets/images/horizontalSplit.svg";

export const SplitContext = createContext();

const Split = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [isPremium, setIsPremium] = useState(true);
  const [proceed, setProceed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setProceed(videoFile !== null);
  }, [videoFile]);

  const handleContinue = async () => {
    if (!isPremium) {
      toast.error("Please subscribe to a paid plan.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }
  
    if (videoFile && isPremium) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append('video', videoFile);
  
        const response = await axios.post('/initiate-split-screen', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.data && response.data.id) {
          navigate(`/workspace/editor/${response.data.id}`);
        } else {
          throw new Error('Failed to initiate split screen');
        }
      } catch (error) {
        console.error('Error initiating split screen:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SplitContext.Provider value={{ videoFile, setVideoFile }}>
      <Container>
        <h1 className='text-white text-xl font-extrabold mb-6 mt-12'>
          Create split screen videos.
        </h1>
        <BorderBox>
          <SplitTabUI />
          <div className='flex justify-end mt-8'>
            <FilledButton
              type='button'
              size='1.8rem'
              proceed={proceed}
              onClick={handleContinue}
              disabled={isLoading || !proceed}
            >
              {isLoading ? 'Processing...' : 'Continue'}
            </FilledButton>
          </div>
        </BorderBox>
        <div className='py-52' />
      </Container>
    </SplitContext.Provider>
  );
};

export default Split;