import iphoneArrowLeft from "../../../../assets/images/iphone-arrow.png";
import iphoneCamera from "../../../../assets/images/camera-icon.png";
import iphoneArrowRight from "../../../../assets/images/fleche-call.png";
import iTipRight from "../../../../assets/images/iTipRight.svg";
import iTipLeft from "../../../../assets/images/iTipLeft.svg";
import iTipLeftDark from "../../../../assets/images/iTipLeftDark.svg";

const IphoneText = ({ isDark = true, message , duration }) => {
  const username = "Unknown";
  const image =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg";

  return (
    <div className='w-full'>
      <section
        className={`header flex justify-between items-center px-5 py-2 ${
          isDark ? "bg-[#1F1E1F]" : "bg-white border-b-2 border-[#D0D0D0]"
        }`}
      >
        <img
          src={iphoneArrowLeft}
          alt='iphoneArrowLeft'
          className='w-[11px] h-[19px]'
        />

        <div>
          <div className='flex flex-col items-center'>
            <div className='profile flex justify-center items-center w-10 h-10 rounded-full bg-[#979BA6]'>
              {image ? (
                <img
                  src={image}
                  alt='profile'
                  className='w-10 h-10 rounded-full object-cover'
                />
              ) : (
                <p className='font-bold text-white uppercase'>
                  {username.charAt(0)}
                </p>
              )}
            </div>
            <div className='flex justify-center items-center gap-1'>
              <p className={`${isDark ? "text-white" : "text-black"}`}>
                {username}
              </p>
              <img
                src={iphoneArrowRight}
                alt='iphoneArrowRight'
                className='w-[6px] h-[10px]'
              />
            </div>
          </div>
        </div>

        <img
          src={iphoneCamera}
          alt='iphoneCamera'
          className='w-[30px] h-[20.7px]'
        />
      </section>

      {!isTemplate &&
        messages.map((msg, index) => {
          if (msg.content.type === "Text") {
            if (!msg.content.message.trim()) {
              return null;
            }

            if (msg.type === "Left") {
              return (
                <section
                  key={index}
                  className={`chat-left ${isDark ? "bg-black" : "bg-white"} px-5 pt-[10px] pb-1 flex justify-start`}
                >
                  <p
                    className={`text-sm text-left ${isDark ? "text-white bg-[#1A1D29]" : "text-black bg-WaChatLeft"} px-3 py-[7px] max-w-[229px] rounded-2xl relative`}
                  >
                    {msg.content.message}
                    <img
                      src={isDark ? iTipLeftDark : iTipLeft}
                      className='absolute bottom-0 left-[-8px]'
                    />
                  </p>
                </section>
              );
            } else if (msg.type === "Right") {
              return (
                <section
                  key={index}
                  className={`chat-right ${isDark ? "bg-black" : "bg-white"} px-5 pt-[10px] pb-1 flex justify-end`}
                >
                  <p className='text-sm text-left text-white bg-WaChatRight px-3 py-[7px] max-w-[229px] mb-2 rounded-2xl relative'>
                    {msg.content.message}
                    <img
                      src={iTipRight}
                      className='absolute bottom-0 right-[-8px]'
                    />
                  </p>
                </section>
              );
            }
          } else if (msg.content.type === "Image") {
            if (!msg.content.url) {
              return null;
            }

            if (msg.type === "Left") {
              return (
                <section
                  key={index}
                  className={`chat-left ${isDark ? "bg-black" : "bg-white"} px-5 pt-[10px] pb-1 flex justify-start`}
                >
                  <div className={`max-w-[229px] rounded-2xl relative overflow-hidden ${isDark ? "bg-[#1A1D29] text-white" : "bg-WaChatLeft text-black"}`}>
                    <img
                      src={msg.content.url}
                      alt='Message content'
                      className='object-cover max-w-[200px] max-h-[200px] rounded-2xl'
                    />
                  </div>
                </section>
              );
            } else if (msg.type === "Right") {
              return (
                <section
                  key={index}
                  className={`chat-right ${isDark ? "bg-black" : "bg-white"} px-5 pt-[10px] pb-1 flex justify-end`}
                >
                  <div className={`max-w-[229px] rounded-2xl relative overflow-hidden bg-WaChatRight`}>
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
          return null;
        })}
    </div>
  );
};

export default IphoneText;