import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import EditorNavbar from "./components/EditorNavbar";
import EditorSidebar from "./components/EditorSidebar";
import BrainTab from "./Tabs/brain/BrainTab";
import FakeTextTab from "./Tabs/fake-text/FakeTextTab";
import AiVideosTab from "./Tabs/ai-videos/AiVideosTab";
import QuizTab from "./Tabs/quiz/QuizTab";
import SplitTabUI from "./Tabs/split/SplitTabUI";
import StoryTab from "./Tabs/story/StoryTab";
import RedditTab from "./Tabs/reddit/RedditTab";
import CaptionsTab from "./Tabs/captions/CaptionsTab";
import WyrTab from "./Tabs/wyr/WyrTab";
import { VideoPlayer } from "./components/VideoPlayer";
import axios from "axios";
// import {MyVideo} from './remotion/MyVideo';

export const EditorContext = createContext();

const dummySubtitles = [
  {
    startTime: "00:00:01",
    endTime: "00:00:03",
    words: [
      { startTime: "00:00:01", text: "This" },
      { startTime: "00:00:01.6", text: "is" },
      { startTime: "00:00:02.1", text: "the" },
      { startTime: "00:00:02.4", text: "first" },
      { startTime: "00:00:02.9", text: "subtitle" },
    ],
  },
  {
    startTime: "00:00:04",
    endTime: "00:00:06",
    words: [
      { startTime: "00:00:04", text: "It" },
      { startTime: "00:00:04.6", text: "contains" },
      { startTime: "00:00:05.2", text: "a" },
      { startTime: "00:00:05.5", text: "few" },
    ],
  },
];

const Editor = () => {
  const [subtitles, setSubtitles] = useState(dummySubtitles);
  const [tabName, setTabName] = useState("Captions");
  const [duration, setDuration] = useState(0);
  const [editorData, setEditorData] = useState({
    subtitles: {},
    styles: {
      font: "Arial",
      fontSize: 120,
      upperCase: false,
      fontStyle: "Bold",
      textColor: "#FFFFFF",
      shadow: false,
      shadowColor: "#000000",
      shadowSize: 3,
      bg: true,
      bgColor: "#000000",
      decoration: {
        stroke: false,
        strokeColor: "#FFFFFF",
        strokeSize: 5,
      },
      brighten: false,
      active: {
        activeMode: "Line",
        activeColors: ["#F0DF02", "#41F108", "#F40006"],
        stroke: false,
        strokeColor: "#FFFFFF",
        strokeSize: 30,
        fontSize: 14,
        fontWeight: "None",
      },
      emoji: {
        emojiPositon: "Top",
        emojiSize: 17,
      },
      effects: {
        autoMove: false,
        autoRotate: false,
        effectType: "Bounce",
        effectTarget: "Word",
      },
      words: {
        wordDisplay: "All",
        lineSpace: 50,
      },
      position: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 300,
      },
    },
    template: {},
    tools: {
      logo: {
        imageURL: "",
        position: "Top Left",
        paddingX: "1",
        paddingY: "1",
        size: "60",
        opacity: "100",
      },
      emojiGif: {},
    },
  });
  const [tabData, setTabData] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { unique_key } = useParams(); // Access the unique key from URL
  const location = useLocation();
  const navigate = useNavigate();

  // console.log(editorData);

  // If no data is passed, redirect back to the workspace
  useEffect(() => {
    const fetchWorkspaceData = async () => {
      if (!unique_key) return;

      setIsLoading(true);
      setError(null);
      try {
        // Send a GET request to fetch workspace data using a unique key
        const response = await axios.get(`/workspace?id=${unique_key}`);
        // console.log(response); // Log the response for debugging

        // Destructure the workspace data from the response for easy access to fields
        const { workspace } = response.data;
        console.log("Complete workspace data:", workspace);

        const {
          type: fetchedType, // 'type' indicates the workspace type (e.g., "Captions", "Split", "Story")
          subtitles: fetchedSubtitles, // 'subtitles' contains any subtitles data if (available for all tabs)
          video: fetchedVideo, // 'video' contains video data if available (mostly for all tabs)
          sound: fetchedSound, // 'sound' contains audio data if available (mostly for all tabs)
          images: fetchedImages, // 'images' contains image data if available for ai videos tab
          backgroundAudio: fetchedBackgroundAudio, // 'backgroundAudio' contains background audio data if available for ai videos tab
          messages: fetchedMessages, // 'messages' contains messages data if available for fake text tab
        } = workspace;

        console.log("Workspace data extracted:", {
          type: fetchedType,
          hasVideo: !!fetchedVideo,
          hasSound: !!fetchedSound,
          hasImages: !!fetchedImages,
          hasSubtitles: !!fetchedSubtitles
        });

        // Conditionally set subtitles if they are defined; use previous state value otherwise
        setSubtitles(fetchedSubtitles || subtitles); // Only updates if fetchedSubtitles is present

        // Set the tab name based on the fetched type
        if (fetchedType) {
          setTabName(fetchedType);
        }

        // Update the editor data conditionally based on the fetched workspace data
        setEditorData((prevData) => ({
          ...prevData, // Preserve previous state values
          type: fetchedType || prevData.type, // Set 'type' if it exists in the response, else keep previous value
          video: fetchedVideo || prevData.video, // Set 'video' if it exists, else keep previous value
          sound: fetchedSound || prevData.sound, // Set 'sound' if it exists, else keep previous value
          images: fetchedImages || prevData.images, // Set 'images' if it exists, else keep previous value
          backgroundAudio: fetchedBackgroundAudio || prevData.backgroundAudio, // Set 'backgroundAudio' if it exists, else keep previous value
          messages: fetchedMessages || prevData.messages, // Set 'messages' if it exists, else keep previous value
        }));

        // Set loading state to false after successful data fetch
        setIsLoading(false);
      } catch (error) {
        // Catch any errors that occur during the data fetch
        console.error("Error fetching workspace data:", error); // Log error to console for debugging
        setError("Failed to fetch workspace data. Please try again."); // Update error state with user-friendly message
        setIsLoading(false); // Ensure loading state is reset, even if an error occurs
      }
    };

    // Check if state exists
    if (!location.state && !unique_key) {
      console.log(location.state);
      navigate("/workspace"); // Redirect if no state and no unique_key is found
    } else if (unique_key) {
      fetchWorkspaceData();
    }
  }, []);

  // Try to access the passed data
  const data = location.state?.data;
  // const language = location.state?.language;
  const img = location.state?.img;
  const selectedTemplate = location.state?.template;

  // If no data, don't try to render anything
  // if (!data) {
  //   return null; // Prevent rendering if no data is available
  // }
  console.log(tabData);

  let mainTabComponent;
  switch (tabName) {
    case "Brain":
      mainTabComponent = <BrainTab data={data} />;
      break;
    case "FakeText":
      mainTabComponent = <FakeTextTab data={data} />;
      break;
    case "Ai Videos":
      mainTabComponent = <AiVideosTab data={data} />;
      break;
    case "Quiz":
      mainTabComponent = (
        <QuizTab data={data} selectedTemplate={selectedTemplate} />
      );
      break;
    case "Split":
      mainTabComponent = <SplitTabUI data={data} />;
      break;
    case "Story":
      mainTabComponent = <StoryTab data={data} />;
      break;
    case "Reddit":
      mainTabComponent = <RedditTab data={data} />;
      break;
    case "Captions":
      mainTabComponent = <CaptionsTab data={data} />;
      break;
    case "Wyr":
      mainTabComponent = <WyrTab data={data} />;
      break;
    default:
      mainTabComponent = null;
  }

  return (
    <EditorContext.Provider
      value={{
        editorData,
        setEditorData,
        tabData,
        setTabData,
        subtitles,
        setSubtitles,
        duration,
        setDuration,
      }}
    >
      <div className='bg-primary grid max-lg:grid-cols-1 grid-cols-[60%_20%] gap-20 p-5 min-h-[100vh]'>
        <div>
          <EditorNavbar tabName={tabName} unique_key={unique_key} />
          <EditorSidebar
            mainTab={mainTabComponent}
            name={tabName}
            img={img}
            tabName={tabName}
          />
        </div>

        <div className='lg:fixed lg:top-24 lg:right-8 lg:w-[35%] w-full max-w-[450px] mx-auto flex justify-center items-start'>
          <div className='w-full flex justify-center'>
            <VideoPlayer />
          </div>
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
