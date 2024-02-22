import { Tab, Tabs } from "@mui/material";
import { Images } from "../../assets";
import { AuthTabTypes, OnActiveTabChange, SignUpDataType } from "../../types/auth-type";
import LoginFormWithValidation from "./logins";
import SignUpFormWithValidation from "./signUp";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type AuthContextType = {
  initialValues: SignUpDataType;
  setInitialValues: Dispatch<SetStateAction<SignUpDataType>>;
  onChangeActiveTab: OnActiveTabChange
};

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthComp = ({
  value = "signIn",
  onChangeActiveTab,
}: {
  value?: AuthTabTypes;
  onChangeActiveTab: (
    newValue: AuthTabTypes
  ) => void;
}) => {
  const [initialValues, setInitialValues] = useState<SignUpDataType>({});

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="bg-white text-black h-fit w-screen max-w-[436px] rounded-lg relative mx-4 py-8 px-4 sm:p-8">
        <img
          src={Images.lightLogo}
          className="h-20 w-20 p-2 mr-1 absolute top-[-40px] left-[calc(50%-40px)]
          sm:h-32 sm:w-32 sm:top-[-65px] sm:left-[calc(50%-70px)]"
          alt="logo"
        />
        <div className=" flex items-center justify-center mb-2">
          <Tabs
            value={value}
            onChange={(event: React.SyntheticEvent, newValue: AuthTabTypes) => onChangeActiveTab(newValue)}
            textColor="primary"
            indicatorColor="primary"
            className="pb-2"
          >
            <Tab value="signIn" label="Sign in" />
            <Tab value="signUp" label="Sign up" />
          </Tabs>
        </div>
        <AuthContext.Provider
          value={{ initialValues, setInitialValues, onChangeActiveTab }}
        >
          {value === "signIn" && <LoginFormWithValidation />}
          {value === "signUp" && <SignUpFormWithValidation />}
        </AuthContext.Provider>
      </div>
    </div>
  );
};

export default AuthComp;
