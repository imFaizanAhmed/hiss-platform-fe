import { useTheme } from "@mui/material/styles";
import CreatePost from "../components/create-post";
import PrimarySearchAppBar from "../components/header";
import ProfileSection from "../components/profile-section";
import AuthPage from "./auth.page";
import Posts from "./posts";

const MainPage = () => {
  const theme = useTheme();
  return (
    <div
      className="App bg-opacity-15 min-h-screen"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <header className="App-header">
        {/* <CallAPI /> */}
        <PrimarySearchAppBar />
        <div className="grid grid-cols-2 pt-20 pb-4 gap-4 mx-4 sm:grid-cols-3 md:mx-0 md:grid-cols-5">
          <ProfileSection />
          <div className="max-w-full col-start-1 col-span-2 sm:col-start-2 sm:max-w-[555px] md:col-start-3">
            <CreatePost />
            <Posts />
          </div>
        </div>
        <AuthPage />
      </header>
    </div>
  );
};

export default MainPage;