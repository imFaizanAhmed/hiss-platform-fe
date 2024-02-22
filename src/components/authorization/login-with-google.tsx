import { useGoogleLogin } from "@react-oauth/google";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import LoginButton from "./login-button";
import { OnActiveTabChange, SignUpDataType } from "../../types/auth-type";
import { AuthContext } from ".";
import { Dispatch, SetStateAction, useContext } from "react";

const LoginWithGoogle = () => {
  const authContext = useContext(AuthContext);

  let setInitialValues: Dispatch<SetStateAction<SignUpDataType>>;
  let onChangeActiveTab: OnActiveTabChange;

  if (authContext) {
    setInitialValues = authContext.setInitialValues;
    onChangeActiveTab = authContext.onChangeActiveTab;
  }

  const googleLogin = useGoogleLogin({
    onSuccess: (credentialResponse) => {
      const { access_token: authAccessToken } = credentialResponse;

      console.log("authAccessToken", authAccessToken)

      // Use the access token to make a request to the Google UserInfo endpoint
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${authAccessToken}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const {
            email,
            given_name: firstName,
            family_name: lastName,
            picture,
          } = data;

          setInitialValues({
            email,
            firstName,
            lastName,
            picture,
            authAccessToken,
          });
          onChangeActiveTab("signUp");
          // data will include user information such as email and name
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
        });
    },
    onError: () => {
      console.error("Login Failed");
    },
  });
  return (
    <div>
      <LoginButton
        icon={faGoogle}
        text="Login with Google"
        onClick={googleLogin}
      />
    </div>
  );
};

export default LoginWithGoogle;
