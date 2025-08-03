import iphoneArrowLeft from "../../../../assets/images/iphone-arrow.png";
import waTipRightLight from "../../../../assets/images/waTipRightLight.svg";
import waTipRightDark from "../../../../assets/images/waTipRightDark.svg";
import waTipLeftDark from "../../../../assets/images/waTipLeftDark.svg";
import waTipLeftLight from "../../../../assets/images/waTipLeftLight.svg";
import iphoneHeaderRight from "../../../../assets/images/iphone-header-right.svg";
import {
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Audio as RemotionAudio,
} from "remotion";

const WhatsappChat = ({
  isDark = true,
  tabData,
  chatDurations,
  messages,
  duration,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const maxVisibleMessages = 9; // Maximum number of messages to display at a time

  // Calculate which messages to show based on the current frame
  const visibleMessages = messages.filter((_, index) => {
    const startFrame = chatDurations
      .slice(0, index)
      .reduce((total, duration) => total + duration * fps, 0);
    return frame >= startFrame && frame < startFrame + fps * duration;
  });

  const messageOffset =
    visibleMessages.length > maxVisibleMessages
      ? visibleMessages.length - maxVisibleMessages
      : 0;

  const messagesToRender = visibleMessages.slice(messageOffset);

  return (
    <div
      className={`w-[345px] h-[600px] ${isDark ? "wa-bg-dark" : "wa-bg-light"}`}
      style={{ scale: tabData.general.fullScreen ? "3.25" : "2.75" }}
    >
      {/* Header */}
      <section
        className={`header flex justify-between items-center px-5 py-2 ${
          isDark ? "bg-[#1F1E1F]" : "bg-white border-b-2 border-[#D0D0D0]"
        }`}
      >
        <div>
          <div className='flex items-center gap-2'>
            <img
              src={iphoneArrowLeft}
              alt='iphoneArrowLeft'
              className='w-[11px] h-[19px] mr-3'
            />
            <img
              src={
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg"
              }
              alt='user image'
              className='w-10 h-10 object-cover rounded-full'
            />
            <div className='flex flex-col gap-0'>
              <p
                className={`text-sm font-bold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                Unknown
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-[#9e9e9e]" : "text-[#9e9e9e]"
                }`}
              >
                Online
              </p>
            </div>
          </div>
        </div>
        <img
          src={iphoneHeaderRight}
          alt='iphoneHeaderRight'
          className='w-[65px] h-[21px]'
        />
      </section>

      {/* Messages */}
      <div className={`flex flex-col`}>
        {messagesToRender.map((msg, index) => {
          const opacity = interpolate(
            frame,
            [index * fps, index * fps + fps * 0.5], // Fade in over 0.5 seconds
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          if (msg.content.type === "Text") {
            if (!msg.content.message.trim()) return null;

            if (msg.type === "Left") {
              return (
                <section
                  key={index}
                  className='chat-left px-5 pt-[10px] pb-1 flex justify-start'
                  style={{ opacity }}
                >
                  <p
                    className={`text-sm text-left ${
                      isDark
                        ? "text-white bg-WaChatLeftDark"
                        : "text-black bg-WaChatLeftLight"
                    } px-3 py-[7px] max-w-[229px] rounded-xl relative`}
                  >
                    {msg.content.message}

                    <img
                      src={isDark ? waTipLeftDark : waTipLeftLight}
                      className='absolute bottom-0 left-[-7px]'
                    />
                  </p>
                </section>
              );
            } else if (msg.type === "Right") {
              return (
                <section
                  key={index}
                  className='chat-right px-5 pt-[10px] pb-1 flex justify-end'
                  style={{ opacity }}
                >
                  <p
                    className={`text-sm text-left ${
                      isDark
                        ? "bg-WaChatRightDark text-white"
                        : "bg-WaChatRightLight text-black"
                    } px-3 py-[7px] max-w-[259px] rounded-xl relative`}
                  >
                    {msg.content.message}

                    <img
                      src={isDark ? waTipRightDark : waTipRightLight}
                      className='absolute bottom-0 right-[-7px]'
                    />
                  </p>
                </section>
              );
            }
          } else if (msg.content.type === "Image") {
            if (!msg.content.url) return null;

            if (msg.type === "Left") {
              return (
                <section
                  key={index}
                  className='chat-left px-5 pt-[10px] pb-1 flex justify-start'
                  style={{ opacity }}
                >
                  <div
                    className={`max-w-[229px] rounded-xl relative overflow-hidden ${
                      isDark
                        ? "bg-[#1A1D29] text-white"
                        : "bg-WaChatLeftLight text-black"
                    }`}
                  >
                    <img
                      src={msg.content.url}
                      alt='Message content'
                      className='object-cover max-w-[200px] max-h-[200px] rounded-xl'
                    />
                  </div>
                </section>
              );
            } else if (msg.type === "Right") {
              return (
                <section
                  key={index}
                  className='chat-right px-5 pt-[10px] pb-1 flex justify-end'
                  style={{ opacity }}
                >
                  <div
                    className={`max-w-[229px] rounded-xl relative overflow-hidden ${
                      isDark ? "bg-WaChatRightDark" : "bg-WaChatRightLight"
                    }`}
                  >
                    <img
                      src={msg.content.url}
                      alt='Message content'
                      className='object-cover max-w-[200px] max-h-[200px] rounded-xl'
                    />
                  </div>
                </section>
              );
            }
          }

          return null; // Default return if type is not handled
        })}
      </div>
    </div>
  );
};

export default WhatsappChat;
