import { useRef, useState } from "react";
import { TextareaAutosize } from "@mui/material";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhotoFilm, faFile } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import ShowModal from "../../lib/model";
import { CreatePostModalType } from "../../types/post.type";
import { CustomTooltip } from "../../lib/tooltip";
import RenderFile from "./render-file";
import { AxiosError, AxiosResponse } from "axios";
import { CreatePostAPIType, FileDisplayProps } from "./types";
import { showToast } from "../../lib/toast";
import axiosInstance from "../../apis/axios";

const CreatePostModal = ({ open, handleClose }: CreatePostModalType) => {
  // State to store the uploaded file
  const [file, setFile] = useState<FileDisplayProps>({
    fileType: "",
    fileUrl: "",
    file: null,
  });
  const fileRef = useRef<HTMLInputElement>(null);
  const pdfFileRef = useRef<HTMLInputElement>(null);

  const [postContent, setPostContent] = useState<string>("");

  const { mutate, isLoading, isError, error } = useMutation<
    AxiosResponse,
    AxiosError,
    CreatePostAPIType
  >(createPostAPI, {
    onSuccess: () => {
      // Handle successful login here
      showToast("Post created successful", "success");
      handleClose();
    },
    onError: ({ response }) => {
      // Handle error casesx
      showToast("Issue occur while creating post", "error");
    },
  });

  async function createPostAPI(
    formData: CreatePostAPIType
  ): Promise<AxiosResponse> {
    return axiosInstance.post(
      "/post/create",
      {
        ...formData,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  }

  // Enhance event typing for better type checking in the event handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) {
      return;
    }

    // console.log("file", file);

    const fileUrl = URL.createObjectURL(file);
    let fileType: "image" | "video" | "pdf" | "" = "";

    if (file.type.startsWith("image/")) {
      fileType = "image";
    } else if (file.type.startsWith("video/")) {
      fileType = "video";
    } else if (file.type === "application/pdf") {
      fileType = "pdf";
    }

    setFile({ fileType, fileUrl, file });
  };

  // Function to trigger the hidden file input click event
  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  // Function to trigger the hidden file input click event
  const handlePdfButtonClick = () => {
    pdfFileRef.current?.click();
  };

  // Function to call create post API on submitting the post
  const onCreatePost = () => {

    mutate({
      media: file.file,
      content: postContent,
      creatorId: "65d1ed166f56de4d16766471",
    });
  };

  return (
    <>
      <ShowModal open={open} handleClose={handleClose}>
        <div className="h-[calc(70vh-76px)] overflow-y-auto">
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Enter your text here"
            value={postContent}
            onChange={(event) => setPostContent(event.target.value)}
            style={{
              width: "100%",
              resize: "none",
              height: file.fileType ? "80%" : "98%",
              borderRadius: 8,
              padding: 8,
              border: "1px solid black",
            }}
          />
          <RenderFile
            fileType={file.fileType}
            fileUrl={file.fileUrl}
            setFile={setFile}
          />
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
          <Button
            variant="contained"
            className="!rounded-lg font-bold"
            onClick={onCreatePost}
          >
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
