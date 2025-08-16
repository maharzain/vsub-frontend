import { Player } from "@remotion/player";
import {
  Audio as RemotionAudio,
  Composition,
  Video,
  Img,
  spring,
  staticFile,
  getInputProps,
  getRemotionEnvironment,
} from "remotion";
import React, { useContext, useState, useCallback, useEffect } from "react";
import {
  useVideoConfig,
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  OffthreadVideo,
  Sequence,
} from "remotion";
import { EditorContext } from "../index";
import { Subtitle } from "./Subtitle.jsx";
import { LogoOverlay } from "./VideoPlayerComponents/LogoOverlay.jsx";
import { deepParseJson } from "deep-parse-json";
import ParticlesAnimation from "./ParticlesAnimation.jsx";
import WhatsappChat from "./faketext-templates/WhatsappChat.jsx";

const VIDEO_URL =
  "https://firebasestorage.googleapis.com/v0/b/vsub-471d3.appspot.com/o/sample2.mp4?alt=media&token=c3045bb5-4c45-43a1-a438-731ac22f4a9f";

export const VideoPlayer = () => {
  const { subtitles, editorData, tabData, setDuration } =
    useContext(EditorContext);
  // console.log("editorData", editorData.images);

  return (
    <VideoPlayerWrapper
      subtitles={subtitles}
      editorData={editorData}
      tabData={tabData}
      setDuration={setDuration}
    />
  );
};

export const VideoPlayerWrapper = ({
  subtitles: propSubtitles,
  editorData: propEditorData,
  tabData: propTabData,
  images: propImages,
  setDuration: setDurationProp,
}) => {
  const { isStudio, isPlayer, isRendering } = getRemotionEnvironment();

  let subtitles, editorData, tabData, inputDuration;

  if (isRendering) {
    const inputProps = getInputProps();
    subtitles = inputProps.subtitles ?? [];
    editorData = inputProps.editorData ?? {};
    tabData = inputProps.tabData ?? {};
    inputDuration = inputProps.duration ?? 0;
  } else {
    subtitles = propSubtitles ?? [];
    editorData = propEditorData ?? {};
    tabData = propTabData ?? {};
    inputDuration = 0; // You might want to set a default value or pass it as a prop
  }

  // Set default tabData for AI videos if it's not properly initialized
  if ((editorData.type === "AiVideo" || editorData.type === "Ai Videos") && (tabData === 0 || !tabData || Object.keys(tabData).length === 0)) {
    tabData = {
      effects: { 
        transition: "Smooth",
        particlesBg: false 
      },
      voice: { 
        voiceVolume: 50,
        voicePitch: 65 
      },
      music: { 
        volume: 40,
        musicFile: null 
      }
    };
    console.log("Set default tabData for AI video:", tabData);
  }

  const [duration, setDuration] = useState(inputDuration);
  const [chatDurations, setChatDurations] = useState([]);
  let hasRun = false; // Flag to track execution

  // console.log("duration", duration);

  if (tabData && tabData["music"] && tabData["music"]["musicFile"]) {
    console.log(tabData["music"]["musicFile"]);
  }
  // console.log({
  //   subtitles,
  //   editorData,
  //   tabData,
  // });

  // console.log("chatDurations",chatDurations);

  useEffect(() => {
    if (duration != 0) {
      return;
    }
    
    const getAudioDuration = async () => {
      try {
        // this duration is used in the video player frames
        const audio = new Audio(editorData.sound);
        audio.addEventListener("loadedmetadata", () => {
          if (!isRendering) {
            setDurationProp(Math.ceil(audio.duration));
          }
          setDuration(Math.ceil(audio.duration));
        });
        audio.addEventListener("error", () => {
          console.error("Error loading audio for duration calculation");
          // Fallback duration for AI videos
          if (editorData.type === "AiVideo" || editorData.type === "Ai Videos") {
            const fallbackDuration = 17; // Based on your audio being ~17 seconds
            setDuration(fallbackDuration);
            if (!isRendering) {
              setDurationProp(fallbackDuration);
            }
          }
        });
      } catch (error) {
        console.error("Error in getAudioDuration:", error);
      }
    };

    //this function will calulate the sum of all audio durations in messages -faketext
    const getAudioDurationSum = async () => {
      if (hasRun) return; // Skip execution if it has already run

      hasRun = true; // Mark as executed
      try {
        // Filter out messages with a sound property in their content
        const soundMessages = editorData.messages.filter(
          (message) => message.content.sound
        );

        // Use Promise.all to fetch each audio duration
        const durations = await Promise.all(
          soundMessages.map((message) => {
            return new Promise((resolve) => {
              const audio = new Audio(message.content.sound);
              audio.addEventListener("loadedmetadata", () => {
                resolve(audio.duration);
              });
              audio.addEventListener("error", () => {
                // If there's an error loading the audio, resolve with a duration of 0
                resolve(0);
              });
            });
          })
        );

        // Sum up all durations and push each duration to the chatDurations array
        let totalDuration = 0;
        durations.forEach((duration) => {
          totalDuration += Math.ceil(duration);
          chatDurations.push(Math.ceil(duration)); // Push each duration to chatDurations array
        });

        // Set the total duration to a state variable or use it as needed
        setDuration(totalDuration); // Assuming setDuration is defined for setting total duration
      } catch (error) {
        console.error("Error calculating audio duration sum:", error);
      }
    };

    const getVideoDuration = async () => {
      // this duration is used in the video player frames
      const video = document.createElement("video");
      video.src = editorData.video;

      video.addEventListener("loadedmetadata", () => {
        if (!isRendering) {
          setDurationProp(Math.ceil(video.duration));
        }
        setDuration(Math.ceil(video.duration));
      });
    };

    // For AI videos, set a default duration based on audio or fallback
    const setAiVideoDuration = () => {
      if (editorData.sound) {
        getAudioDuration(); // Use audio duration if available
      } else {
        // Fallback: calculate duration based on number of images (3 seconds per image)
        const imageCount = editorData.images ? editorData.images.reduce((total, item) => total + item.images.length, 0) : 4;
        const calculatedDuration = imageCount * 3; // 3 seconds per image
        console.log("Setting AI video duration to:", calculatedDuration, "seconds for", imageCount, "images");
        setDuration(calculatedDuration);
        if (!isRendering) {
          setDurationProp(calculatedDuration);
        }
      }
    };

    console.log("Duration calculation - Type:", editorData.type, "Sound:", !!editorData.sound, "Current Duration:", duration);

    if (editorData.type === "AiVideo" || editorData.type === "Ai Videos") {
      setAiVideoDuration(); // Always use AI video duration logic for AI videos
    } else if (editorData.sound) {
      getAudioDuration(); // get audio duration
    } else if (editorData.video) {
      getVideoDuration(); // get video duration
    } else if (editorData.type === "FakeText") {
      getAudioDurationSum(); //get audio pieces and sum their duration
    }
  }, [editorData.sound, editorData.video, editorData.messages, duration]);

  if (duration == 0) {
    return null; // Return early if audio duration is not available yet
  }

  return (
    <div style={{
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "10px"
    }}>
      <Composition
        id='SubtitlesVideo'
        component={SubtitlesVideoComponent}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={duration * 30}
      />
      <Player
        component={SubtitlesVideoComponent}
        durationInFrames={duration * 30}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        style={{
          width: "100%",
          maxWidth: "380px",
          height: "auto",
          aspectRatio: "9/16",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#000",
        }}
        controls
        inputProps={{
          subtitles: subtitles,
          editorData: editorData,
          tabData: tabData,
          duration: duration,
          chatDurations: chatDurations,
        }}
      />
    </div>
  );
};

const SubtitlesVideoComponent = (props) => {
  const { isStudio, isPlayer, isRendering } = getRemotionEnvironment();

  let subtitles, editorData, tabData, duration, chatDurations;

  if (isRendering) {
    const inputProps = getInputProps();
    subtitles = inputProps.subtitles ?? [];
    editorData = inputProps.editorData ?? {};
    tabData = inputProps.tabData ?? {};
    duration = inputProps.duration ?? 0;
    chatDurations = inputProps.chatDurations ?? []; // Chat durations for FakeText
  } else {
    subtitles = props.subtitles ?? [];
    editorData = props.editorData ?? {};
    tabData = props.tabData ?? {};
    duration = props.duration ?? 0;
    chatDurations = props.chatDurations ?? []; // Chat durations for FakeText
  }
  
  // Set default tabData for AI videos if it's not properly initialized
  if ((editorData.type === "AiVideo" || editorData.type === "Ai Videos") && (tabData === 0 || !tabData || Object.keys(tabData).length === 0)) {
    tabData = {
      effects: { 
        transition: "Smooth",
        particlesBg: false 
      },
      voice: { 
        voiceVolume: 50,
        voicePitch: 65 
      },
      music: { 
        volume: 40,
        musicFile: null 
      }
    };
  }
  
  let imagesData;
  console.log("VideoPlayer editorData:", editorData);
  console.log("VideoPlayer tabData:", tabData);
  console.log("VideoPlayer editorData.type:", editorData.type);

  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  // console.log("rendering frame: ", frame);
  // console.log(editorData.images[0].images[0].image);

  // State to track positions of the rectangles
  const [leftRectPosition, setLeftRectPosition] = useState({
    x: 0,
    y: height / 2 - 15,
  });
  const [rightRectPosition, setRightRectPosition] = useState({
    x: width / 2,
    y: height / 2 - 15,
  });

  const timeToSeconds = (time) => {
    const parts = time.split(":");
    return (
      parseInt(parts[0], 10) * 3600 +
      parseInt(parts[1], 10) * 60 +
      parseFloat(parts[2])
    );
  };

  const getCurrentText = () => {
    const seconds = frame / 30;
    const subtitle = subtitles.find(
      (sub) =>
        seconds >= timeToSeconds(sub.startTime) &&
        seconds <= timeToSeconds(sub.endTime)
    );

    if (!subtitle) return "";

    let currentText = "";

    subtitle.words.forEach((word) => {
      if (seconds >= timeToSeconds(word.startTime)) {
        currentText += word.text + " ";
      }
    });

    return currentText.trim();
  };

  const currentText = getCurrentText();

  if (editorData.images) {
    const images = editorData.images.flatMap((item) =>
      item.images.map((img) => img.image)
    );
    imagesData = images;
    console.log("Extracted images data:", imagesData);
    console.log("Total images found:", imagesData.length);
  } else {
    console.log("No editorData.images found");
  }

  return (
    <AbsoluteFill
      id='video-player'
      style={{
        backgroundColor: "black",
        display: "flex",
        flexDirection: tabData.settings?.verticalSplit ? "row" : "column", // Flex direction based on vertical split setting
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {/* this block is for background music */}
      {(tabData?.music?.musicFile || editorData.backgroundAudio) && (
        <RemotionAudio
          volume={tabData.music.volume ? tabData.music.volume / 100 : 0.5}
          src={tabData.music.musicFile || editorData.backgroundAudio} // Use tabData musicFile first, then fallback to editorData.backgroundAudio(this is returned from the Server in ai video)
        />
      )}

      {/* Main video section for both vertical and top-bottom splits */}
      {/* Default video rendering for most content types */}
      {editorData.type !== "Ai Videos" && editorData.type !== "AiVideo" && editorData.type !== "FakeText" && editorData.type !== "Brain" && (
        <OffthreadVideo
          src={
            editorData.type === "Split"
              ? editorData.video
              : tabData.video?.files?.[tabData.video.selectedVideo] || // First priority: selected video
                editorData.video || // Second priority: editor video
                VIDEO_URL // Fallback: default video URL
          }
          startFrom={tabData.video?.startsFrom || 0}
          muted={tabData.video?.mute ?? false} // check if it exists
          style={{
            objectFit: "cover",
            width: tabData.settings?.verticalSplit ? "50%" : "100%", // Width for vertical split
            height: tabData.settings?.verticalSplit ? "100%" : "100%", // Height for vertical split
            position: tabData.settings?.verticalSplit ? "relative" : "absolute", // Positioning for each layout type
            top:
              tabData.settings?.reversePosition &&
              !tabData.settings?.verticalSplit
                ? "50%"
                : 0, // Reverse position for top-bottom split
            left: 0,
            zIndex: 0,
            pointerEvents: "none", // Disable interaction with the video
          }}
        />
      )}

      {/* Image sequence for AI videos */}
      {(editorData.type === "Ai Videos" || editorData.type === "AiVideo") && (
        <>
          {imagesData && imagesData.length > 0 ? (
            <ImageSequence
              images={imagesData}
              duration={duration * 30}
              tabData={tabData || { effects: { transition: "Smooth" } }}
            />
          ) : (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: 'white',
              fontSize: '18px',
              textAlign: 'center',
              background: 'rgba(0,0,0,0.7)',
              padding: '20px',
              borderRadius: '8px'
            }}>
              <div>AI Video Loading...</div>
              <div style={{fontSize: '14px', marginTop: '10px'}}>
                {!editorData.images ? 'No image data found' : 
                 !imagesData ? 'Processing images...' : 
                 `Found ${imagesData.length} images`}
              </div>
              <div style={{fontSize: '12px', marginTop: '5px', color: '#ccc'}}>
                Editor Type: {editorData.type}
              </div>
            </div>
          )}
        </>
      )}

      {editorData.type === "FakeText" && (
        <FakeTextTemplate
          duration={duration} // Duration of the video
          tabData={tabData} // Tab data for the FakeText tab
          editorData={editorData} // Editor data for the FakeText tab
          chatDurations={chatDurations} // Duration of each audio in the messages for texts
        />
      )}

      {editorData.type === "Brain" && (
        <BrainTemplate
          duration={duration} // Duration of the video
          tabData={tabData} // Tab data for the Brain tab
          editorData={editorData} // Editor data for the Brain tab
        />
      )}

      {/* Video for the split screen bottom or side view */}
      {editorData.type === "Split" && (
        <OffthreadVideo
          src={
            tabData.video?.files?.[tabData.video.selectedVideo] || // First priority: selected video
            editorData.video // Second priority: editor video
          }
          startFrom={tabData.video?.startsFrom || 0}
          muted={tabData.video?.mute ?? false} // check if it exists
          style={{
            objectFit: "cover",
            width: tabData.settings.verticalSplit ? "50%" : "100%", // Width for vertical split
            height: tabData.settings.verticalSplit ? "100%" : "50%", // Height for vertical split
            position: tabData.settings.verticalSplit ? "relative" : "absolute", // Positioning for each layout type
            top:
              !tabData.settings.reversePosition &&
              !tabData.settings.verticalSplit
                ? "50%"
                : 0, // Top-bottom split positioning
            left:
              tabData.settings.verticalSplit && tabData.settings.reversePosition
                ? "50%"
                : 0,

            zIndex: 0,
            pointerEvents: "none", // Disable interaction with the video
          }}
        />
      )}

      {/* this audio is the character/narrater voice for stories & other tabs*/}
      {editorData.sound && (
        <RemotionAudio
          volume={
            tabData.voice?.voiceVolume ? tabData.voice?.voiceVolume / 100 : 0.5
          }
          toneFrequency={
            tabData.voice?.voicePitch
              ? (tabData.voice?.voicePitch * 2) / 100
              : 1
          }
          src={editorData?.sound}
        />
      )}
      {/* Subtitle overlay */}
      <Subtitle editorData={editorData} subtitles={subtitles} />
      <LogoOverlay editorData={editorData} />
      {tabData.effects?.particlesBg && <ParticlesAnimation />}
    </AbsoluteFill>
  );
};

export default SubtitlesVideoComponent;

const ImageSequence = ({ images, duration, tabData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const imagesCount = images.length;
  if (imagesCount === 0) return null;

  // Ensure tabData has default values
  const safeTabData = tabData || {};
  const effects = safeTabData.effects || { transition: "Smooth" };

  // Calculate frames per image
  const framesPerImage = duration / imagesCount;
  const imageIndex = Math.floor(frame / framesPerImage) % imagesCount;

  // Define swipe directions and sounds for each
  const swipeEffects = [
    { x: -100, y: 0, sound: "/swipes/swipeleft.mp3" }, // Swipe left
    { x: 100, y: 0, sound: "/swipes/swiperight.mp3" }, // Swipe right
    { x: 0, y: -100, sound: "/swipes/swipeup.mp3" }, // Swipe up
    { x: 0, y: 100, sound: "/swipes/swipedown.mp3" }, // Swipe down
  ];

  return (
    <div>
      {images.map((src, i) => {
        const isCurrentImage = i === imageIndex;
        const swipeEffect = swipeEffects[i % swipeEffects.length];

        // Scale for Smooth transition
        const initialScale = i % 2 === 0 ? 1 : 1.1;
        const targetScale = initialScale === 1 ? 1.1 : 1;
        const scale = interpolate(
          frame % framesPerImage,
          [0, framesPerImage],
          [initialScale, targetScale],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Fade-in and fade-out effect with opacity
        const fadeOpacity = interpolate(
          frame % framesPerImage,
          [0, framesPerImage * 0.2, framesPerImage * 0.8, framesPerImage],
          [0, 1, 1, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );

        // Spring-based swipe effect for Strong Swipe
        const swipeSpring = spring({
          frame: frame - imageIndex * framesPerImage,
          fps,
          config: { damping: 20, mass: 0.5, stiffness: 200 },
        });

        const translateX = interpolate(swipeSpring, [0, 1], [swipeEffect.x, 0]);
        const translateY = interpolate(swipeSpring, [0, 1], [swipeEffect.y, 0]);

        // Shaky effect
        const shakeIntensity = 5;
        const shakeSpeed = 0.1;
        const shakyTranslateX =
          translateX + Math.sin(frame * shakeSpeed) * shakeIntensity;
        const shakyTranslateY =
          translateY + Math.cos(frame * shakeSpeed) * shakeIntensity;

        // Apply transition styles
        const transitionStyle =
          effects.transition === "Smooth"
            ? "opacity 0.3s ease-in-out, transform 0.2s ease-in-out"
            : "none";

        // console.log("mounted again!");
        return (
          <div key={i}>
            <Img
              key={i + "image"}
              src={src}
              style={{
                opacity:
                  effects.transition === "Smooth"
                    ? isCurrentImage
                      ? fadeOpacity
                      : 0
                    : isCurrentImage
                      ? 1
                      : 0,
                transform:
                  effects.transition === "Smooth"
                    ? `scale(${scale})`
                    : effects.transition === "Strong Swipe" &&
                        isCurrentImage
                      ? `translateX(${shakyTranslateX}%) translateY(${shakyTranslateY}%)`
                      : "none",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
                bottom: "0",
                right: "0",
                width: "100%",
                height: "100%",
                transition: transitionStyle,
                scale:
                  effects.transition === "Strong Swipe"
                    ? "1.2"
                    : "none",
              }}
            />

            {/* Play sound for each swipe effect*/}
            {effects.transition === "Strong Swipe" &&
              isCurrentImage && (
                <Sequence
                  key={`audio-${i}`}
                  from={i * framesPerImage}
                  durationInFrames={framesPerImage}
                >
                  <RemotionAudio
                    src={staticFile(swipeEffect.sound)}
                    volume={1}
                  />
                </Sequence>
              )}
          </div>
        );
      })}
    </div>
  );
};

const FakeTextTemplate = ({ duration, editorData, tabData, chatDurations }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  let cumulativeFrame = 0; // Tracks the start frame dynamically
  console.log("FakeText editorData:", editorData);
  console.log("FakeText tabData:", tabData);

  // Ensure tabData.video exists with default values for FakeText
  const videoData = tabData?.video || {
    files: [],
    selectedVideo: 0,
    startsFrom: 0,
    mute: false
  };

  return (
    <div>
      <OffthreadVideo
        src={videoData.files?.[videoData.selectedVideo] || VIDEO_URL}
        startFrom={videoData.startsFrom || 0}
        muted={videoData.mute ?? false} // check if it exists
        style={{
          objectFit: "cover",
          width: "100%", // Width for vertical split
          height: "100%", // Height for vertical split
          position: "absolute", // Positioning for each layout type
          top: 0, // Reverse position for top-bottom split
          left: 0,
          zIndex: 0,
          pointerEvents: "none", // Disable interaction with the video
        }}
      />

      <WhatsappChat
        tabData={tabData}
        chatDurations={chatDurations}
        messages={editorData?.messages}
        duration={duration}
      />

      {/* Sequence ensures that the audio plays sequentially */}
      <Sequence from={0} durationInFrames={duration * fps}>
        {editorData?.messages?.map((msg, index) => {
          const { mute, type } = msg; // Extract dynamic values
          const { sound, volume } = msg.content; // Extract dynamic values
          const messageDuration = chatDurations[index] || 0; // Default to 0 if duration is missing

          // Message Sound Start Frame
          const messageStartFrame = cumulativeFrame;
          cumulativeFrame += messageDuration * fps; // Increment frame for message sound
          
          // Safe access to voice settings with defaults
          const leftVoiceSettings = tabData?.leftVoice || { voiceVolume: 100, voiceSpeed: 1 };
          const rightVoiceSettings = tabData?.rightVoice || { voiceVolume: 100, voiceSpeed: 1 };
          
          //volume of the text message sound
          const soundVolume =
            type === "Left"
              ? leftVoiceSettings.voiceVolume / 100
              : rightVoiceSettings.voiceVolume / 100;
          //speed of the text message sound
          const soundSpeed =
            type === "Left"
              ? leftVoiceSettings.voiceSpeed
              : rightVoiceSettings.voiceSpeed;
 

          return (
            <Sequence
              key={index}
              from={messageStartFrame} // Message sound start frame
              durationInFrames={messageDuration * fps} // Duration in frames
            >
              {sound && (
                <RemotionAudio
                  src={sound}
                  muted={mute || false} // Dynamically set mute
                  volume={soundVolume} // Dynamically set volume
                  playbackRate={soundSpeed} // audio  playback rate
                />
              )}
            </Sequence>
          );
        })}
      </Sequence>
    </div>
  );
};

const BrainTemplate = ({ duration, editorData, tabData }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  console.log("Brain editorData:", editorData);
  console.log("Brain tabData:", tabData);

  // Ensure tabData.video exists with default values for Brain
  const videoData = tabData?.video || {
    files: [],
    selectedVideo: 0,
    startsFrom: 0,
    mute: false
  };

  return (
    <div>
      <OffthreadVideo
        src={videoData.files?.[videoData.selectedVideo] || VIDEO_URL}
        startFrom={videoData.startsFrom || 0}
        muted={videoData.mute ?? false}
        style={{
          objectFit: "cover",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Brain Teaser Questions Display */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "80%",
        }}
      >
        <p>Brain Teaser Video</p>
        <p style={{ fontSize: "18px", marginTop: "10px" }}>
          Language: {editorData.language || "English"}
        </p>
        <p style={{ fontSize: "18px", marginTop: "5px" }}>
          Media: {editorData.media || "Not specified"}
        </p>
        <p style={{ fontSize: "16px", marginTop: "5px" }}>
          Template: {editorData.selectedTemplate || "Default"}
        </p>
      </div>

      {/* Audio for Brain content if available */}
      {editorData.sound && (
        <RemotionAudio
          src={editorData.sound}
          volume={tabData?.voice?.voiceVolume / 100 || 0.5}
          playbackRate={tabData?.voice?.voiceSpeed || 1}
        />
      )}
    </div>
  );
};
