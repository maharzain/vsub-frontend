const ImageUpload = ({ onChange, name = 'imageURL', id = 'image-upload' }) => {
  return (
    <div>
      <input
        type="file"
        accept="image/*"
        name={name} // Use dynamic name
        id={id} // Use dynamic id
        style={{ display: 'none' }}
        onChange={onChange}
      />
      <label
        htmlFor={id} // Label tied to dynamic id
        style={{ minHeight: '1.8rem', height: '1.8rem' }}
        className='btn bg-[#2A3041] hover:bg-purpleBlack hover:border-accentIndigo hover:text-accentIndigo text-white text-[1rem] sm:text-base font-normal rounded-md'
      >
        <span>Change</span>
      </label>
    </div>
  );
};

export default ImageUpload;
