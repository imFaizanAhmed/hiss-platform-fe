import { useRef, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhotoFilm,
  faFile,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ShowModal from "../../lib/model";
import { CreatePostModalType } from "../../types/create-post.type";
import { CustomTooltip } from "../../lib/tooltip";
import RenderFile from "./render-file";

export interface FileDisplayProps {
  fileType?: "image" | "video" | "pdf" | "";
  fileUrl: string;
}

const CreatePostModal = ({ open, handleClose }: CreatePostModalType) => {
  // State to store the uploaded file
  const [file, setFile] = useState<FileDisplayProps>({
    fileType: "",
    fileUrl: "",
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfFileRef = useRef<HTMLInputElement>(null);

  const [postContent, setPostContent] = useState<string>('');

  // Enhance event typing for better type checking in the event handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }

    const fileUrl = URL.createObjectURL(file);
    let fileType: "image" | "video" | "pdf" | "" = "";

    if (file.type.startsWith("image/")) {
      fileType = "image";
    } else if (file.type.startsWith("video/")) {
      fileType = "video";
    } else if (file.type === "application/pdf") {
      fileType = "pdf";
    }

    setFile({ fileType, fileUrl });
  };

  // Function to trigger the hidden file input click event
  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  // Function to trigger the hidden file input click event
  const handlePdfButtonClick = () => {
    pdfFileRef.current?.click();
  };

  // Function to remove media
  const handleRemoveMedia = () => {
    // setFile({
    //   fileType: "",
    //   fileUrl: "",
    // });
  };

  const RemoveMedia = ({ handleRemove }: { handleRemove: () => void }) => (
    <CustomTooltip tooltipText="Remove Media">
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="mr-4 h-5 cursor-pointer absolute top-2 right-2"
        onClick={handleRemove}
      />
    </CustomTooltip>
  );

  const DisplayImage: React.FC<FileDisplayProps> = ({ fileUrl }) => {
    return (
      <div className="relative h-[200px] border-cyan-50">
        <img
          src={fileUrl}
          alt="Uploaded"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            border: "0.5px solid black",
            padding: 4,
            borderRadius: 8,
          }}
        />
        <RemoveMedia handleRemove={handleRemoveMedia} />
      </div>
    );
  };

  const DisplayVideo: React.FC<FileDisplayProps> = ({ fileUrl }) => {
    return (
      <div className="relative h-[200px] border-cyan-50">
        <video
          controls
          style={{ width: "100%", maxHeight: "400px", padding: 4 }}
        >
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <RemoveMedia handleRemove={handleRemoveMedia} />
      </div>
    );
  };

  return (
    <>
      <ShowModal open={open} handleClose={handleClose}>
        <div className="h-[calc(70vh-76px)] overflow-y-auto">
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter your text here"
            // onChange={(e) => setPostContent(e.value.target)}
            style={{
              width: "100%",
              resize: "none",
              height: file.fileType ? "80%" : "100%",
              borderRadius: 8,
              padding: 8,
              border: "1px solid black",
            }}
          />
          <RenderFile fileType={file.fileType} fileUrl={file.fileUrl} setFile={setFile}/>
        </div>
        <div className="flex justify-between items-center mt-2 h-9">
          <div id="modal-modal-description">
            <CustomTooltip tooltipText="Media">
              <FontAwesomeIcon
                icon={faPhotoFilm}
                className="mr-4 h-5 cursor-pointer"
                onClick={handleButtonClick}
              />
            </CustomTooltip>
            <CustomTooltip tooltipText="Document">
              <FontAwesomeIcon
                icon={faFile}
                className="h-5 cursor-pointer"
                onClick={handlePdfButtonClick}
              />
            </CustomTooltip>
          </div>
          <Button variant="contained" className="!rounded-lg font-bold">
            Post
          </Button>
        </div>
      </ShowModal>
      <input
        style={{ display: "none" }}
        type="file"
        accept="image/*,video/*"
        onChange={handleFileUpload}
        ref={fileRef}
      />
      <input
        style={{ display: "none" }}
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        ref={pdfFileRef}
      />
    </>
  );
};

export default CreatePostModal;
