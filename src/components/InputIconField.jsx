const InputIconField = ({
  placeholder,
  inputType,
  Icon,
  name,
  value,
  onChange,
  onBlur,
  error,
}) => {
  return (
    <div className='flex flex-col'>
      <label
        className={`flex-control input input-bordered flex items-center gap-2 ${
          error ? "input-error" : ""
        }`}
      >
        <Icon />
        <input
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className='grow bg-transparent focus:outline-none'
          placeholder={placeholder}
        />
      </label>
      {error && <div className='text-red-500 text-sm mt-1'>{error}</div>}
    </div>
  );
};

export default InputIconField;
