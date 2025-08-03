import { useContext, useState, useEffect } from "react";
import TextStyles from "../TextStyles";
import { EditorContext } from "../../index";
import StrokeStyles from "./StrokeStyles";
import BorderContainer from "./BorderContainer";
import CheckBox from "../../../../components/CheckBox";
import Dropdown from "../../../../components/Dropdown";
import ColorPicker from "../ColorPicker";
import NumberTagInput from "../../../../components/NumberTagInput";

const StylesTab = () => {
  const { editorData, setEditorData } = useContext(EditorContext);
  const active = editorData.styles.active;
  const emoji = editorData.styles.emoji;
  const effects = editorData.styles.effects;
  const position = editorData.styles.position;

  const [activeMode, setActiveMode] = useState(active.activeMode);
  const [activeFontWeight, setActiveFontWeight] = useState(active.fontWeight);

  const [emojiPositon, setEmojiPositon] = useState(emoji.emojiPositon);

  const [effectType, setEffectType] = useState(effects.effectType);
  const [effectTarget, setEffectTarget] = useState(effects.effectTarget);

  const handleChanges = (fieldName, value) => {
    setEditorData((prevData) => ({
      ...prevData,
      styles: {
        ...prevData.styles,
        [fieldName]: value,
      },
    }));
  };

  const handleSubObjectChanges = (subObject, fieldName, value) => {
    setEditorData((prev) => ({
      ...prev,
      styles: {
        ...prev.styles,
        [subObject]: {
          ...prev.styles[subObject],
          [fieldName]: value,
        },
      },
    }));
  };

  const handleActiveColorChanges = (color, fieldName, index) => {
    setEditorData((prev) => ({
      ...prev,
      styles: {
        ...prev.styles,
        active: {
          ...prev.styles.active,
          [fieldName]: prev.styles.active[fieldName].map((item, i) =>
            i === index ? color.hex : item
          ),
        },
      },
    }));
  };

  const handleEffectsChanges = (fieldName, value) => {
    handleSubObjectChanges("effects", fieldName, value);
  };

  useEffect(() => {
    // Update activeMode and activeFontWeight in 'active', and emojiPosition in 'emoji'
    handleSubObjectChanges("active", "activeMode", activeMode);
    handleSubObjectChanges("active", "fontWeight", activeFontWeight);
    handleSubObjectChanges("emoji", "emojiPositon", emojiPositon);
    handleSubObjectChanges("effects", "effectType", effectType);
    handleSubObjectChanges("effects", "effectTarget", effectTarget);
  }, [activeMode, activeFontWeight, emojiPositon, effectType, effectTarget]); // Trigger effect when any value changes

  return (
    <div>
      <TextStyles
        settings={editorData}
        setSettings={setEditorData}
        objectName='styles'
      />

      <p className='font-bold text-lg text-white mb-4'>Decoration</p>
      <BorderContainer>
        {/* stroke styles */}
        <StrokeStyles
          settings={editorData}
          setSettings={setEditorData}
          objectName='styles'
          subObject='decoration'
        />

        {/* brighten checkbox */}
        <CheckBox
          label='Brighten'
          fieldName='brighten'
          checked={editorData.styles.brighten}
          onChange={handleChanges}
        />
      </BorderContainer>

      {/* Active Part */}

      {/* <p className='font-bold text-lg text-white my-4'>Active</p>
      <BorderContainer>
        <div>
          <p className='text-primary-font my-2'>Active Mode</p>

          <Dropdown
            width={"w-32"}
            value={activeMode}
            options={["None", "Word", "Line"]}
            setOptionValue={setActiveMode}
          />
        </div>
        <div>
          <p className='text-primary-font my-2'>Active Colors</p>
          <div className='flex gap-4 my-4'>
            <ColorPicker
              bg={active.activeColors[0]}
              fieldName='activeColors'
              index={0}
              handleColorChange={handleActiveColorChanges}
            />
            <ColorPicker
              bg={active.activeColors[1]}
              fieldName='activeColors'
              index={1}
              handleColorChange={handleActiveColorChanges}
            />
            <ColorPicker
              bg={active.activeColors[2]}
              fieldName='activeColors'
              index={2}
              handleColorChange={handleActiveColorChanges}
            />
          </div>
        </div>
      </BorderContainer>

      <p className='text-primary-font mt-4'>Active stroke</p>
      <StrokeStyles
        settings={editorData}
        setSettings={setEditorData}
        objectName='styles'
        subObject='active'
      /> */}

      {/* <BorderContainer>
        <div>
          <p className='text-primary-font my-2'>Active font size</p>
          <NumberTagInput
            value={active.fontSize}
            onChange={(e) =>
              handleSubObjectChanges("active", "fontSize", e.target.value)
            }
            tag='px'
          />
        </div>

        <div>
          <p className='text-primary-font my-2'>Active font weight</p>
          <Dropdown
            width={"w-32"}
            value={activeFontWeight}
            options={["None", "Normal", "Bold", "Extra Bold"]}
            setOptionValue={setActiveFontWeight}
          />
        </div>
      </BorderContainer> */}

      {/* Emoji section */}
      {/* <p className='font-bold text-lg text-white my-4 mt-10'>Emoji</p>
      <BorderContainer>
        <div>
          <p className='text-primary-font my-2'>Emoji Position</p>
          <Dropdown
            width={"w-32"}
            value={emojiPositon}
            options={["None", "Auto", "Top", "Bottom"]}
            setOptionValue={setEmojiPositon}
          />
        </div>

        <div>
          <p className='text-primary-font my-2'>Emoji Size</p>
          <NumberTagInput
            value={emoji.emojiSize}
            onChange={(e) =>
              handleSubObjectChanges("emoji", "emojiSize", e.target.value)
            }
            tag='%'
          />
        </div>
      </BorderContainer> */}

      {/* effects section */}
      <div>
        <p className='font-bold text-lg text-white mt-10'>Effects</p>
        {/* <div className='flex flex-wrap gap-6 my-1'>
          <CheckBox
            label='Auto Move'
            fieldName='autoMove'
            checked={effects.autoMove}
            onChange={handleEffectsChanges}
          />

          <CheckBox
            label='Auto Rotate'
            fieldName='autoRotate'
            checked={effects.autoRotate}
            onChange={handleEffectsChanges}
          />
        </div> */}

        <BorderContainer>
          <div>
            <p className='text-primary-font mb-3'>Effect type</p>
            <Dropdown
              width={"w-32"}
              value={effectType}
              options={["Bounce", "Fade", "Big"]}
              setOptionValue={setEffectType}
            />
          </div>

          <div>
            <p className='text-primary-font mb-3'>Effect target</p>
            <Dropdown
              width={"w-32"}
              value={effectTarget}
              options={["Line", "Word"]}
              setOptionValue={setEffectTarget}
            />
          </div>
        </BorderContainer>

        <p className='font-bold text-lg text-white mt-6 mb-4'>Decoration</p>
        {/* Position section */}
        <BorderContainer>
          <div className='flex flex-col gap-1'>
            {/* padding left */}
            <p className='text-primary-font'>Padding Left</p>
            <NumberTagInput
              value={position.paddingLeft}
              onChange={(e) =>
                handleSubObjectChanges(
                  "position",
                  "paddingLeft",
                  e.target.value
                )
              }
              tag='px'
            />
          </div>

          <div className='flex flex-col gap-1'>
            {/* padding Right */}
            <p className='text-primary-font'>Padding Right</p>
            <NumberTagInput
              value={position.paddingRight}
              onChange={(e) =>
                handleSubObjectChanges(
                  "position",
                  "paddingRight",
                  e.target.value
                )
              }
              tag='px'
            />
          </div>

          <div className='flex flex-col gap-1'>
            {/* padding Bottom */}
            <p className='text-primary-font'>Padding Bottom</p>
            <NumberTagInput
              value={position.paddingBottom}
              onChange={(e) =>
                handleSubObjectChanges(
                  "position",
                  "paddingBottom",
                  e.target.value
                )
              }
              tag='px'
            />
          </div>
        </BorderContainer>
      </div>
    </div>
  );
};

export default StylesTab;
