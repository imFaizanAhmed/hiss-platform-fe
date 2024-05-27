import { useReducer } from "react";
import { AxiosError, AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { showToast } from "../../lib/toast";
import axiosInstance from "../../apis/axios";
import { LikeUnlikeCommentType, likeUnlikeType } from "../../types/post.type";

type ActionType = { type: "LIKE" } | { type: "UNLIKE" };

interface StateType {
  isLike: boolean;
  updatedLikeCount: number;
}

const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "LIKE":
      return {
        ...state,
        isLike: true,
        updatedLikeCount: state.updatedLikeCount + 1,
      };
    case "UNLIKE":
      return {
        ...state,
        isLike: false,
        updatedLikeCount: state.updatedLikeCount - 1,
      };
    default:
      return state;
  }
};

const LikeAComment = ({
  creatorId,
  commentId,
  likeCount,
  postId,
}: {
  creatorId: string;
  commentId: number;
  likeCount: number;
  postId: string;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    isLike: false,
    updatedLikeCount: likeCount,
  } as StateType);

  const { mutate } = useMutation<
    AxiosResponse,
    AxiosError,
    LikeUnlikeCommentType
  >(likeUnlikeCommentAPI, {
    onError: () => {
      if (state.isLike) {
        dispatch({ type: "LIKE" });
      } else {
        dispatch({ type: "UNLIKE" });
      }
      showToast("something went wrong", "error");
    },
  });

  async function likeUnlikeCommentAPI(
    formData: LikeUnlikeCommentType
  ): Promise<AxiosResponse> {
    return axiosInstance.post("/post/like-unlike-comment", {
      ...formData,
    });
  }

  const onLikeUnlikeComment = () => {
    let likeCount, status: likeUnlikeType = 'LIKE';
    if (state.isLike) {
      dispatch({ type: "UNLIKE" });
      likeCount = state.updatedLikeCount - 1;
      status = 'UNLIKE';
    } else {
      dispatch({ type: "LIKE" });
      likeCount = state.updatedLikeCount + 1;
    }

    // ? have to change that creatorId to actually login creator Id
    mutate({
      commentId,
      likeCount,
      postId,
      creatorId,
      status
    });
  };

  return (
    <button
      className="text-[#f44336] hover:text-[#d44336] text-xs"
      onClick={onLikeUnlikeComment}
    >
      {!!state.updatedLikeCount && <span>{state.updatedLikeCount}</span>} Like
    </button>
  );
};

export default LikeAComment;
