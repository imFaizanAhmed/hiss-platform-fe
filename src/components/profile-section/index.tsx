import { Avatar } from "@mui/material";
import { Images } from "../../assets";

const ProfileSection = () => {
  return (
    <div className="bg-white col-start-1 col-span-2 rounded-lg p-4 h-fit sm:col-span-1 md:col-start-2">
      <div className="flex justify-center items-center flex-wrap flex-col">
        <Avatar
          alt="Remy Sharp"
          className="!h-14 !w-14"
          src={Images.profilePic2}
        />
        <div id="username" className="text-lg font-medium mt-2">
          Remy Sharp
        </div>
        <div id="bio" className="text-sm font-normal">
          {" "}
          This is my bio. It will be replaced by others' own bio.
        </div>
        <div className="border-t border-gray-500 my-1 w-full"></div>
      </div>
    </div>
  );
};

export default ProfileSection;
