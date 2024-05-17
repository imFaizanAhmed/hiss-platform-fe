import { Avatar } from "@mui/material";
import { Images } from "../../assets";
import { useState } from "react";
import CreatePostModal from "./create-post.modal";

const CreatePost = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="py-2 px-4 bg-white rounded-lg">
      <div className="flex gap-2">
        <Avatar
          alt="Remy Sharp"
          className="!h-12 !w-12"
          src={Images.profilePic2}
        />
        <input
          placeholder="Start a post"
          className="h-12 rounded-3xl border-solid border-2 px-4 w-full outline-none cursor-pointer caret-transparent"
          onClick={handleOpen}
        />
      </div>
      <CreatePostModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default CreatePost;
