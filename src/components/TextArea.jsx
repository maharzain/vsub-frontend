const TextArea = ({ name, id, value, height = "min-h-12", onChange }) => {
  return (
      <textarea
        name={name}
        id={id}
        value={value} // Bind the value to textarea
        onChange={onChange}
        className={`scrollbar w-full ${height} bg-transparent border-2 border-primary-border hover:border-accentIndigo rounded-md p-1 px-3 focus:outline-none focus:border-2 focus:border-accentIndigo`}
      />
  );
};

export default TextArea;
