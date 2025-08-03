import { useContext } from "react";
import { languages } from "../../../constants";
import Dropdown from "../../../components/Dropdown";
import { fakeTextContext } from "../index";

const FakeTextLanguage = () => {
  const { language, setLanguage } = useContext(fakeTextContext);
  return (
    <div>
      <Dropdown
        width={"w-44"}
        value={language}
        options={languages}
        setOptionValue={setLanguage}
      />
    </div>
  );
};

export default FakeTextLanguage;
