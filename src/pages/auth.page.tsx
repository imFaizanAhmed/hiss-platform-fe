import { useState } from "react";
import AuthComp from "../components/authorization";
import { AuthTabTypes } from "../types/auth-type";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<AuthTabTypes>("signIn");

  const onChangeActiveTab = (newValue: AuthTabTypes) => {
    setActiveTab(newValue);
  }
  return <AuthComp value={activeTab} onChangeActiveTab={onChangeActiveTab}/>;
};

export default AuthPage;
