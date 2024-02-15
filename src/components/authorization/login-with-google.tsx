import { useGoogleLogin } from "@react-oauth/google";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "./login-button";

const LoginWithGoogle = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
    },
    onError: () => {
      console.log("Login Failed");
    },
  });
  return (
    <div>
      <LoginButton icon={faGoogle} text="Login with Google" onClick={googleLogin}/>
    </div>
  );
};

export default LoginWithGoogle;
