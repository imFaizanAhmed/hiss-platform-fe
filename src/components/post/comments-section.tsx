import { useEffect, useRef, useState } from "react";
import { Avatar } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import { useTheme } from "@mui/material";
import { useMutation } from "react-query";
import { Images } from "../../assets";
import { AxiosError, AxiosResponse } from "axios";
import ResponsiveInputField from "../../lib/responsive-input";
import { AddCommentPayload, getPostResposeType } from "../../types/post.type";
import axiosInstance from "../../apis/axios";
import { showToast } from "../../lib/toast";
import LikeAComment from "./like-a-comment";
import useFetchComments from "./useFetchComments.hook";
import LoadingComments from "./loading-comments";
import { CustomAxiosError } from "../../apis/axios.types";

const CommentsSection = ({ postData }: { postData: getPostResposeType }) => {
  const theme = useTheme();
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchComments({ postId: postData?._id });

  const [comment, setComment] = useState<string>("");
  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError<CustomAxiosError>,
    AddCommentPayload
  >(addCommentsAPI, {
    onSuccess: () => {
      // Handle successful
      setComment("");
    },
    onError: ({ response }) => {
      // Handle
      showToast(response?.data?.message || "something went wrong", "error");
    },
  });

  async function addCommentsAPI(
    formData: AddCommentPayload
  ): Promise<AxiosResponse> {
    return axiosInstance.post("/post/add-post-comments", {
      ...formData,
    });
  }

  const onCommentSubmitted = () => {
    // ? have to change that creatorId to actually login creator Id
    mutate({
      content: comment,
      creatorId: "65d1ed166f56de4d16766471", // postData?.creatorId,
      postId: postData?._id,
    });
    postData.comments.unshift({
      id: -1,
      creatorId: postData?.creatorId,
      content: comment,
      totalLikes: 0,
    });
    setComment("");
  };

  const observerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // infinite scroll functionality
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (observerElem.current) {
      observer.observe(observerElem.current);
    }

    return () => {
      if (observerElem.current) {
        observer.unobserve(observerElem.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
      <h3 className="w-full">Comments</h3>
      {data?.pages.map((page, index) => {
        const comments = !!page && page[0];
        return (
          <div key={index} className="w-full">
            {!!comments.data
              ? comments.data.map((comment) => {
                  return (
                    <div key={comment._id} className="w-full flex gap-2">
                      <Avatar
                        alt="Remy Sharp"
                        className="!h-10 !w-10"
                        src={Images.profilePic2}
                      />
                      <div className="w-full">
                        <p
                          className="my-auto p-2 rounded"
                          style={{
                            backgroundColor: theme.palette.background.default,
                          }}
                        >
                          {comment.content}
                        </p>
                        <LikeAComment
                          commentId={comment._id}
                          postId={postData._id}
                          creatorId={postData?.creatorId}
                          likeCount={comment.totalLikes ?? 0}
                        />
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        );
      })}
      <div ref={observerElem} style={{ height: "20px" }} />
      {(isFetchingNextPage || isLoading) && (
        <div>
          <LoadingComments />
          <LoadingComments />
        </div>
      )}
      {!hasNextPage && <div>No More Comments</div>}
    </div>
  );
};

export default CommentsSection;
