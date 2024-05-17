import CreatePost from "../components/create-post";
// import PrimarySearchAppBar from "../components/header";
import PrimarySearchAppBar from "../components/Header";
import ProfileSection from "../components/profile-section";
import Posts from "./posts";

const MainPage = () => {
  return (
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
      </header>
  );
};

export default MainPage;