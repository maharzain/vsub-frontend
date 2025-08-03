
import logo from "../../../assets/images/logo-white2.png";

const LoginHeader = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-center my-8">
      <img src={logo} className="w-[10.5rem]" />
      <p className="text-[1rem] sm:text-[1.1rem] text-dimGray-2">
        Login to get unlimited access and save your files
      </p>
    </div>
  );
};

export default LoginHeader;
