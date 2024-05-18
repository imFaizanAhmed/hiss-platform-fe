import { useState } from "react";
import { Avatar } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTheme } from "@mui/material";
import { useMutation } from "react-query";
import { Images } from "../../assets";
import { AxiosError, AxiosResponse } from "axios";
import ResponsiveInputField from "../../lib/responsive-input";
import { addCommentPayload, getPostResposeType } from "../../types/post.type";
import axiosInstance from "../../apis/axios";

const CommentsSection = ({ postData }: { postData: getPostResposeType }) => {
  const theme = useTheme();

  const [comment, setComment] = useState<string>("");
  const { mutate, isLoading, isError, error } = useMutation<
    AxiosResponse,
    AxiosError,
    addCommentPayload
  >(createPostAPI, {
    onSuccess: () => {
      // Handle successful
      setComment("");
    },
    onError: ({ response }) => {
      // Handle error
    },
  });

  async function createPostAPI(
    formData: addCommentPayload
  ): Promise<AxiosResponse> {
    return axiosInstance.post(
      "/post/add-comment",
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

  const onCommentSubmitted = () => {
    console.log("comment =>", comment);
    // ? have to change that creatorId to actually login creator Id
    mutate({
      content: comment,
      creatorId: postData?.creatorId,
      postId: postData?._id,
    });
    console.log("Adding comments on the frontend");
    postData.comments.unshift({
      id: -1,
      creatorId: postData?.creatorId,
      content: comment,
    });
    setComment("");
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="w-full flex gap-2">
        <Avatar
          alt="Remy Sharp"
          className="!h-12 !w-12"
          src={Images.profilePic2}
        />
        <ResponsiveInputField
          placeholder="Write valuable comment"
          Icon={DoubleArrowIcon}
          text={comment}
          setText={setComment}
          onSubmit={onCommentSubmitted}
        />
      </div>
      <h3>Comments</h3>
      {!!postData.comments?.length
        ? postData.comments.map((comment, index) => (
            <div key={index} className="w-full flex gap-2">
              <Avatar
                alt="Remy Sharp"
                className="!h-10 !w-10"
                src={Images.profilePic2}
              />
              <p
                className="my-auto w-full p-2 rounded whitespace-pre"
                style={{ backgroundColor: theme.palette.background.default }}
              >
                {comment.content}
              </p>
            </div>
          ))
        : null}
    </div>
  );
};

export default CommentsSection;
