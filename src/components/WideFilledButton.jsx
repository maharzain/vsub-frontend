const WideFilledButton = ({children, onClick, type}) => {
  return (
    <button style={{minHeight: '2.6rem', height: '2.6rem'}} type={type} onClick={onClick} className="btn bg-darkIndigo hover:bg-accentIndigo text-dimGray text-[1rem] sm:text-[1.1rem] font-normal w-full rounded-[0.6rem]">
      {children}
    </button>
  );
};

export default WideFilledButton;
