import { useGoogleLogin } from "@react-oauth/google";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "./login-button";

const LoginWithGoogle = () => {
  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      console.log(credentialResponse);
      const { access_token } = credentialResponse;

      // Use the access token to make a request to the Google UserInfo endpoint
      fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        // console.log('User Info:', data);
        const { email, given_name: firstName, family_name: lastName, picture} = data;
        console.log({email, firstName, lastName, picture});
        // data will include user information such as email and name
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
      });
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
