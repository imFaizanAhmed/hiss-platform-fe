import { useState } from "react";
import AuthComp from "../components/authorization";
import { AuthTabTypes } from "../types/auth-type";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<AuthTabTypes>("signIn");

  const onChangeActiveTab = (event: React.SyntheticEvent, newValue: AuthTabTypes) => {
    setActiveTab(newValue);
  }
  return <AuthComp value={activeTab} handleChange={onChangeActiveTab}/>;
};

export default AuthPage;
