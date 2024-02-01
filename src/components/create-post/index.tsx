import { Avatar } from "@mui/material";
import { Images } from "../../assets";

const CreatePost = () => {
  return (
    <div className="py-2 px-4 max-w-[555px] w-screen bg-white rounded-lg">
      <div className="flex gap-2">
        <Avatar
          alt="Remy Sharp"
          className="!h-12 !w-12"
          src={Images.profilePic2}
        />
        <input
          placeholder="Start a post"
          className="h-12 rounded-3xl border-solid border-2 px-4 w-full outline-none"
        />
      </div>
    </div>
  );
};

export default CreatePost;
