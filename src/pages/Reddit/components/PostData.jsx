import { useContext } from "react";
import { IconAsterisk } from "@tabler/icons-react";
import IconChevronDown from "../../../assets/images/IconChevronDown.svg";
import SearchMenu from "../../../components/SearchMenu";
import { languages } from "../../../constants";
import { RedditContext } from "../index";
import NumberTagInput from "../../../components/NumberTagInput";
import InputText from "../../../components/InputText";

const PostData = () => {
  const {
    includeComments,
    setIncludeComments,
    langInput,
    setLangInput,
    language,
    setLanguage,
    maxCharacters,
    setMaxCharacters,
    postLink,
    setPostLink,
  } = useContext(RedditContext);

  const calculateTime = (characters) => {
    if (!characters || isNaN(characters)) return "0s";

    // Assuming 1 character = 1 second for simplicity
    const totalSeconds = Math.floor(characters / 20);

    // Convert total seconds to minutes and seconds
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    // Format minutes and seconds
    const formattedMinutes = minutes > 0 ? `${minutes}m ` : "";
    const formattedSeconds = `${seconds}s`;

    return `${formattedMinutes}${formattedSeconds}`;
  };

  return (
    <div className='text-primary-font'>
      {/* COMMENTS CHECKBOX */}
      <label className='inline-flex label cursor-pointer'>
        <span>Include Comments:</span>
        <input
          type='checkbox'
          checked={includeComments}
          onChange={() => setIncludeComments(!includeComments)}
          className='checkbox checkbox-sm checkbox-primary ml-3 sm:ml-20'
        />
      </label>

      {/* Character count input */}
      <div className='flex items-center mt-6'>
        <p>Max Characters:</p>
        <div className='border-2 border-r-0 border-primary-border rounded-l-md ml-2 px-2 py-1'>
          <input
            type='number'
            name='characters'
            id={"sear"}
            min={10}
            placeholder='3000'
            className='w-16 bg-transparent focus:outline-none focus:border-darkIndigo'
            value={maxCharacters}
            onChange={(e) => setMaxCharacters(e.target.value)}
          />
        </div>
        <span className='bg-[#1E212B] border-2 border-primary-border px-3 rounded-r-md py-1'>
          {calculateTime(maxCharacters)}
        </span>
      </div>

      {/* Language Selection */}
      <div>
        <span className='flex items-center mt-6 gap-[2px] mb-2 w-5'>
          <IconAsterisk size={10} style={{ color: "red" }} />
          <p>Language</p>
        </span>

        <SearchMenu
          isVoice={false}
          width='w-56 sm:w-[260px]'
          inputField={true}
          name={"language"}
          inputType={"text"}
          value={langInput}
          image={IconChevronDown}
          onChange={(e) => {
            setLangInput(e.target.value);
          }}
          options={languages}
          selectedOption={language}
          setOptionValue={setLanguage}
        />
      </div>
      {/* Post Link section */}
      <div>
        <span className='flex items-center mt-6 gap-[2px] mb-2'>
          <IconAsterisk size={10} style={{ color: "red" }} />
          <p>Link</p>
        </span>

        <InputText
          value={postLink}
          name='post-link'
          size='w-56 w-56 sm:w-[260px]'
          placeholder='Enter Reddit Post Link'
          onChange={(e) => setPostLink(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PostData;
