import { TextareaAutosize } from "@mui/material";
import { Button } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faFile } from "@fortawesome/free-solid-svg-icons";
import ShowModal from "../../lib/model";
import { CreatePostModalType } from "../../types/create-post.type";
import { CustomTooltip } from "../../lib/tooltip";

const CreatePostModal = ({ open, handleClose }: CreatePostModalType) => {
  return (
    <ShowModal open={open} handleClose={handleClose}>
      <TextareaAutosize
        aria-label="empty textarea"
        placeholder="Enter your text here"
        style={{
          width: "100%",
          height: "calc(55vh)",
          resize: "none",
          borderRadius: 8,
          padding: 8,
          border: "1px solid black",
        }}
      />
      <div className="flex justify-between items-center">
        <div id="modal-modal-description">
          <CustomTooltip tooltipText="Media">
            <FontAwesomeIcon icon={faPhotoFilm} className="pr-4 h-5" />
          </CustomTooltip>
          <CustomTooltip tooltipText="Document">
            <FontAwesomeIcon icon={faFile} className="pr-4 h-5" />
          </CustomTooltip>
        </div>
        <Button variant="contained" className="!rounded-lg font-bold">
          Post
        </Button>
      </div>
    </ShowModal>
  );
};

export default CreatePostModal;
