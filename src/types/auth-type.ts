export type AuthTabTypes = "signIn" | "signUp";

export type SignUpDataType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  title?: string;
  password?: string;
  confirmPassword?: string;
  picture?: string;
  authAccessToken?: string;
};

export type LoginDataType = {
  email?: string;
  password?: string;
};

export type OnActiveTabChange = (newValue: AuthTabTypes) => void;
