//whatsappchat
import { useContext } from "react";
import iphoneArrowLeft from "../../../../assets/images/iphone-arrow.png";
import waTipRightLight from "../../../../assets/images/waTipRightLight.svg";
import waTipRightDark from "../../../../assets/images/waTipRightDark.svg";
import waTipLeftDark from "../../../../assets/images/waTipLeftDark.svg";
import waTipLeftLight from "../../../../assets/images/waTipLeftLight.svg";
import iphoneHeaderRight from "../../../../assets/images/iphone-header-right.svg";
import profile from "../../../../assets/images/profile.webp";

const WhatsappChat = ({ isDark = true, messages }) => {
  // Extract necessary values from context
  const username = "Unknown";
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";

  return (
    <div className='w-[345px] min-h-[595px]' style={{ scale: "3.25" }}>
      {/* Header section with profile and navigation icons */}
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

            {/* Profile image */}
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
                {username}
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
      {/* messages section */}
      <div className={`flex flex-col ${isDark ? "wa-bg-dark" : "wa-bg-light"}`}>
        {/* Render messages only if not in template mode */}
        {messages.map((msg, index) => {
          // Handle text content
          if (msg.content.type === "Text") {
            if (!msg.content.message.trim()) {
              return null; // Skip empty messages
            }

            if (msg.type === "Left") {
              // Render left text messages
              return (
                <section
                  key={index}
                  className={`chat-left px-5 pt-[10px] pb-1 flex justify-start`}
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
              // Render right text messages
              return (
                <section
                  key={index}
                  className={`chat-right px-5 pt-[10px] pb-1 flex justify-end`}
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
          }
          // Handle image content
          else if (msg.content.type === "Image") {
            if (!msg.content.url) {
              return null; // Skip rendering if the URL is empty
            }

            if (msg.type === "Left") {
              // Render left image messages
              return (
                <section
                  key={index}
                  className={`chat-left px-5 pt-[10px] pb-1 flex justify-start`}
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
              // Render right image messages
              return (
                <section
                  key={index}
                  className={`chat-right px-5 pt-[10px] pb-1 flex justify-end`}
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

          return null; // Render nothing if the message type/content is not recognized
        })}
      </div>
    </div>
  );
};

export default WhatsappChat;

