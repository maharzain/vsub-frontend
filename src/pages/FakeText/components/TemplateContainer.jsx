const TemplateContainer = ({ children, heading, onClick }) => {
  return (
    <div
      className='border-2 border-primary-border px-4 pt-4 pb-2 rounded-md relative hover:cursor-pointer hover:border-pink-800'
      onClick={onClick}
    >
      {children}
      <p className='mt-5'>{heading}</p>
      <div className='absolute w-[91%] border rounded-md border-primary-border bottom-[38px]' />
    </div>
  );
};

export default TemplateContainer;
