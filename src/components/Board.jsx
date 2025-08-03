const Board = (props) => {
  const {
    background,
    width,
    height,
    padding,
    border,
    borderRadius,
    borderColor,
    center
  } = props;

  const bg = background ? `bg-${background}` : "";
  const p = padding ? `p-[${padding}]` : "";
  const b = border ? `border-[${border}] border-solid` : "";
  const br = borderRadius ? `rounded-${borderRadius}` : "";
  const bc = border ? borderColor ? `border-${borderColor}` : "" : "";
  const position = center ? "mx-auto" : "";

  return (
    <div style={{width: width, height: height}} className={`${bg} ${p} ${b} ${br} ${bc} ${position}`}>
      {props.children}
    </div>
  );
};

export default Board;
