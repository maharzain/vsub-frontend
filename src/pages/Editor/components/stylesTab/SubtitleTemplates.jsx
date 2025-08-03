import { subtitleTemplates } from "../../../../constants/index";
import SubtitleTemplate from "./SubtitleTemplate";

const SubtitleTemplates = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {subtitleTemplates.map((template, index) => (
        <SubtitleTemplate key={index} styles={template} />
      ))}
    </div>
  );
};

export default SubtitleTemplates;
