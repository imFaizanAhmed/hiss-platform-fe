import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ShowModal from "../../lib/model";
import { CreatePostModalType } from "../../types/create-post.type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const CreatePostModal = ({ open, handleClose }: CreatePostModalType) => {
  return (
    <ShowModal open={open} handleClose={handleClose} header={"Create Post"}>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </ShowModal>
  );
};

export default CreatePostModal;
