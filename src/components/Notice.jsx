const Notice = ({ children, bg, borderColor }) => {
  return (
    <div
      className={`w-full ${bg} border-[0.5px] border-solid ${borderColor} px-3 py-2 text-dimGray-2 font-normal text-[1rem] rounded-lg`}
    >
      {children}
    </div>
  );
};

export default Notice;
