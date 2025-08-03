import { useContext } from "react";
import iphoneArrowLeft from "../../../../assets/images/iphone-arrow.png";
import profile from "../../../../assets/images/profile.webp";
import igHeaderDark from "../../../../assets/images/ig-header-dark.png";
import igHeaderLight from "../../../../assets/images/ig-header-light.png";
import { fakeTextContext } from "../../index";

const IgChat = ({ isDark, isTemplate }) => {
  // Extract necessary values from context
  const { instagramUserId, image, messages } = useContext(fakeTextContext);

  return (
    <div className='max-w-[359px]'>
      {/* Header section with profile and navigation icons */}
      <section
        className={`header flex justify-between items-center px-5 py-2 ${
          isDark ? "bg-black" : "bg-white"
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
              src={image ? image : profile}
              alt='user image'
              className='w-10 h-10 object-cover rounded-full'
            />

            <div className='flex flex-col gap-0'>
              <p
                className={`text-sm font-bold ${
                  isDark ? "text-white" : "text-black"
                }`}
              >
                {instagramUserId}
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
          src={isDark ? igHeaderDark : igHeaderLight}
          alt='header image'
          className='w-[115px] h-[50px]'
        />
      </section>

      {/* Profile section */}
      <div
        className={`flex flex-col justify-center items-center gap-1 ${
          isDark ? "bg-black" : "bg-white"
        }`}
      >
        <img
          src={image ? image : profile}
          alt='profile photo'
          className='w-[100px] h-[100px] object-cover rounded-full mt-4'
        />
        <p className={`text-sm ${isDark ? "text-white" : "text-black"}`}>
          {instagramUserId}
        </p>
      </div>

      <div className={`chat flex flex-col ${isDark ? "bg-black" : "bg-white"}`}>
        {/* Optional template message section */}
        {isTemplate && (
          <section
            className={`chat-right px-5 pt-[10px] pb-1 flex justify-end`}
          >
            <p
              className={`text-sm text-left text-white ${
                isDark ? "bg-igRightDark" : "bg-igRightLight"
              } px-3 py-[7px] max-w-[289px] rounded-2xl`}
            >
              Dad! I want to marry 😍
            </p>
          </section>
        )}

        {/* Render messages only if not in template mode */}
        {!isTemplate &&
          messages.map((msg, index) => {
            if (msg.content.type === "Text") {
              if (!msg.content.message.trim()) {
                return null; // Skip rendering if the message is empty
              }

              if (msg.type === "Left") {
                // Render left text messages
                return (
                  <section
                    key={index}
                    className={`chat-left flex items-center gap-2 px-5 pt-[10px] pb-1 justify-start`}
                  >
                    <img
                      src={image ? image : profile}
                      alt='profile'
                      className='w-[26px] h-[26px] rounded-full'
                    />
                    <p
                      className={`text-sm text-left ${
                        isDark
                          ? "bg-igLeftDark text-white"
                          : "bg-igLeftLight text-black"
                      } px-3 py-[7px] max-w-[289px] rounded-2xl relative`}
                    >
                      {msg.content.message}
                    </p>
                  </section>
                );
              } else if (msg.type === "Right") {
                // Render right text messages
                return (
                  <section
                    key={index}
                    className={`chat-right px-5 pt-[10px] pb-1 flex justify-end`}
                  >
                    <p
                      className={`text-white text-sm text-left ${
                        isDark ? "bg-igRightDark" : "bg-igRightLight"
                      } px-3 py-[7px] max-w-[289px] rounded-2xl relative`}
                    >
                      {msg.content.message}
                    </p>
                  </section>
                );
              }
            } else if (msg.content.type === "Image") {
              if (!msg.content.url) {
                return null; // Skip rendering if the URL is empty
              }

              if (msg.type === "Left") {
                // Render left image messages
                return (
                  <section
                    key={index}
                    className={`chat-left flex items-center gap-2 px-5 pt-[10px] pb-1 justify-start`}
                  >
                    <img
                      src={null}
                      alt='profile'
                      className='w-[26px] h-[26px] rounded-full'
                    />
                    <div
                      className={`max-w-[289px] rounded-2xl relative overflow-hidden ${
                        isDark ? "bg-igLeftDark" : "bg-igLeftLight"
                      }`}
                    >
                      <img
                        src={msg.content.url}
                        alt='Message content'
                        className='object-cover max-w-[200px] max-h-[200px] rounded-2xl'
                      />
                    </div>
                  </section>
                );
              } else if (msg.type === "Right") {
                // Render right image messages
                return (
                  <section
                    key={index}
                    className={`chat-right px-5 pt-[10px] pb-1 flex justify-end`}
                  >
                    <div
                      className={`max-w-[289px] rounded-2xl relative overflow-hidden bg-igRightLight`}
                    >
                      <img
                        src={msg.content.url}
                        alt='Message content'
                        className='object-cover max-w-[200px] max-h-[200px] rounded-2xl'
                      />
                    </div>
                  </section>
                );
              }
            }

            return null; // If the message type/content is not recognized, render nothing
          })}
      </div>
    </div>
  );
};

export default IgChat;
