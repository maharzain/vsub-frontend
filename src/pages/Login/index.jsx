import { useState } from "react";
import axios from "axios";
import { useGoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Notice from "../../components/Notice";
import WideFilledButton from "../../components/WideFilledButton";
import BorderButton from "../../components/BorderButton";
import { IconBrandGoogleFilled } from "@tabler/icons-react";
import LoginHeader from "./components/LoginHeader";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google sign-in successful:", tokenResponse);

      // navigate("/workspace");
      try {
        const res = await axios.post("/auth/google", {
          token: tokenResponse.access_token, // send token to backend
        });

        const data = res.data;
        if (res.status === 200) {
          const data = res.data;
          console.log("User authenticated:", data);
          navigate("/workspace");
        } else {
          console.error("Error during authentication:", res.data.error);
        }
      } catch (err) {
        console.error("Failed to authenticate:", err);
      }
    },
    onError: (error) => {
      console.error("Google sign-in failed:", error);
    },
  });

  return (
    <div className="bg-lightDimPurple min-h-screen py-5 flex justify-center items-center overflow-y-auto overflow-x-hidden">
      <div className="bg-darkDimPurple w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[38rem] rounded-lg p-5 sm:p-7 flex flex-col items-center gap-3">
        <LoginHeader />
        <div className="mb-8 w-full">
          {!showForm && (
            <div className="flex flex-col items-center justify-center gap-3 w-[95%] md:w-[75%] mx-auto">
              {/* Google Sign-in using custom button */}
              <WideFilledButton onClick={() => login()}>
                <IconBrandGoogleFilled size={18} />
                Sign in with Google
              </WideFilledButton>
              <BorderButton onClick={() => setShowForm(true)}>
                Sign in with Email & Password
              </BorderButton>
            </div>
          )}

          {showForm && <LoginForm setShowForm={setShowForm} />}
        </div>
        {!showForm && (
          <Notice>
            We don't have a sign-up form. Your account is created automatically when you log in with a Google account.
          </Notice>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId="318210077438-85n6s8r7h8n6313gipss1pb9o9hdvpii.apps.googleusercontent.com">
      <Login />
    </GoogleOAuthProvider>
  );
};

export default App;