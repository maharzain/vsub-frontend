const BorderButton = ({ onClick, children }) => {
  return (
    <button
      onClick={onClick}
      style={{ minHeight: "1.8rem", height: "1.8rem" }}
      className='btn bg-purpleBlack hover:bg-purpleBlack hover:border-accentIndigo hover:text-accentIndigo border-[0.5px] border-gray-700 text-dimGray text-[1rem] sm:text-base font-normal rounded-md'
    >
      {children}
    </button>
  );
};

export default BorderButton;
