import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../pages/auth.page";
import MainPage from "../pages";
import ErrorPage from "./error-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: <MainPage />,
  },
]);
