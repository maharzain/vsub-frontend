import React from "react";
import { TheBoldFont } from "./load-font";
import { fitText } from "@remotion/layout-utils";
import { makeTransform, scale, translateY } from "@remotion/animation-utils";

import { loadFont as loadPermanentMarker } from "@remotion/google-fonts/PermanentMarker";
import { loadFont as loadMontserrat } from "@remotion/google-fonts/Montserrat";
import { loadFont as loadBokor } from "@remotion/google-fonts/Bokor";
import { loadFont as loadCaveat } from "@remotion/google-fonts/Caveat";

// Load the fonts
const { fontFamily: montserrat } = loadMontserrat();
const { fontFamily: permanentMarker } = loadPermanentMarker();
const { fontFamily: caveat } = loadCaveat();

import {
  useVideoConfig,
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  OffthreadVideo,
  Sequence,
} from "remotion";

export const Subtitle = ({ editorData, subtitles }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const timeToSeconds = (time) => {
    const parts = time.split(":");
    return (
      parseInt(parts[0], 10) * 3600 +
      parseInt(parts[1], 10) * 60 +
      parseFloat(parts[2])
    );
  };

  console.log(editorData.template.font);

  return (
    <AbsoluteFill>
      {subtitles.map((subtitle, index) => (
        <Sequence
          key={index + "subs"}
          from={timeToSeconds(subtitle.startTime) * fps}
          durationInFrames={
            (timeToSeconds(subtitle.endTime) -
              timeToSeconds(subtitle.startTime)) *
            fps
          }
        >
          <div
            style={{
              fontFamily: editorData.template.font,
              fontSize: editorData.template?.fontSize
                ? `${editorData.template.textSize}px`
                : `${editorData.styles.fontSize}px`,
              color: editorData.template?.color
                ? editorData.template.color
                : editorData.styles.textColor,
              backgroundColor:
                editorData.template?.backgroundColor &&
                editorData.template.backgroundColor,
              fontWeight: editorData.template?.fontWeight
                ? editorData.template.fontWeight
                : editorData.styles.fontStyle.includes("Extra Bold")
                  ? "bolder"
                  : "normal",
              width: "fit-content",
              height: "fit-content",
              // position: "absolute",
              margin: "0 auto",
              marginTop: "135%",
              bottom: `${editorData.styles.position.paddingBottom}px`,
              borderRadius: "10px",
              // left: 0,
              // right: 0,
              // display: "flex",
              // flexWrap: "wrap",
              // justifyContent: "center",
              // alignItems: "center",
              padding: `0 ${editorData.styles.position.paddingLeft}px 0 ${editorData.styles.position.paddingRight}px`,
              opacity:
                editorData.styles.effects.effectTarget === "Line"
                  ? interpolate(
                      frame - timeToSeconds(subtitle.startTime) * fps,
                      [0, 1],
                      [0, 1],
                      { extrapolateRight: "clamp" }
                    )
                  : undefined,
              transform:
                editorData.template?.title === "Devin"
                  ? "rotate(10deg)"
                  : editorData.styles.effects.effectTarget === "Line" &&
                      editorData.styles.effects.effectType === "Bounce"
                    ? `translateY(${interpolate(
                        frame - timeToSeconds(subtitle.startTime) * fps,
                        [0, 1],
                        [10, 0],
                        { extrapolateRight: "clamp" }
                      )}px)`
                    : undefined,
              transition: "transform 0.03s ease-in-out",
            }}
          >
            {subtitle.words.map((word, index2) => {
              const shouldBounce =
                editorData.styles.effects.effectType === "Bounce" &&
                editorData.styles.effects.effectTarget === "Word";
              const opacity = interpolate(
                frame - timeToSeconds(word.startTime) * fps,
                [0, 1],
                [0, 1],
                { extrapolateRight: "clamp" }
              );
              const translateY = shouldBounce
                ? interpolate(
                    frame - timeToSeconds(word.startTime) * fps,
                    [0, 1],
                    [10, 0],
                    { extrapolateRight: "clamp" }
                  )
                : 0;

              return (
                <div
                  key={index2 + "sub_div"}
                  style={{
                    color: editorData.template?.color
                      ? editorData.template.color
                      : editorData.styles.textColor,
                    WebkitTextStroke: editorData.styles.decoration.stroke
                      ? `${editorData.styles.decoration.strokeSize}px ${editorData.styles.decoration.strokeColor}`
                      : undefined,
                    // fontFamily: editorData.styles.font,
                    fontWeight: editorData.template?.fontWeight
                      ? editorData.template.fontWeight
                      : editorData.styles.fontStyle.includes("Extra Bold")
                        ? "bolder"
                        : "normal",
                    fontStyle: editorData.styles.fontStyle.includes("Italic")
                      ? "italic"
                      : "normal",
                    // color: editorData.styles.textColor,
                    textTransform: editorData.template?.textTransform
                      ? editorData.template.textTransform
                      : editorData.styles.upperCase
                        ? "uppercase"
                        : "",
                    fontSize: editorData.template?.fontSize
                      ? `${editorData.template.textSize}px`
                      : `${editorData.styles.fontSize}px`,
                    textShadow: editorData.template?.textShadow
                      ? editorData.template.textShadow
                      : editorData.styles.shadow
                        ? `${editorData.styles.shadowSize}px ${editorData.styles.shadowSize}px ${editorData.styles.shadowSize}px ${editorData.styles.shadowColor}`
                        : "none",
                    filter: editorData.styles.brighten ? "brightness(2)" : "",
                    display: "inline-block",
                    margin: "0 10px",
                    opacity:
                      editorData.styles.effects.effectTarget === "Line"
                        ? undefined
                        : opacity,
                    transform:
                      editorData.styles.effects.effectTarget === "Line"
                        ? undefined
                        : `translateY(${translateY}px)`,
                    transition: "transform 0.03s ease-in-out",
                  }}
                >
                  {word.text}
                </div>
              );
            })}
          </div>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};

export default Subtitle;
