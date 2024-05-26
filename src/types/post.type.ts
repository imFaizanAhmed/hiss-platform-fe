export type CreatePostModalType = {
  open: boolean;
  handleClose: () => void;
};

export type getPostResposeType = {
  _id: string;
  creatorId: string;
  content: string;
  reactions: { reaction: string; creatorId: string }[];
  creator: {
    firstName: string;
    lastName: string;
  };
  comments: {
    id: number;
    creatorId: string;
    content: string;
    totalLikes: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    replies?: {
      id: number;
      userId: string;
      content: string;
      reactions: { reaction: string; creatorId: string }[];
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
    }[];
  }[];
  file?: Buffer;
  fileUrl?: string;
  media?: string;
  createdAt: Date;
};

export type ApiResponse = {
  data: getPostResposeType[];
  hasMore: boolean;
};

export type getCommentsApiData = {
  content: string;
  createdAt: Date;
  creatorId: string;
  deletedAt: Date | null;
  id: number;
  totalLikes: number;
  updatedAt: string;
  _id: number;
};

export type getCommentsApiResponse = {
  data: getCommentsApiData[];
  hasMore: boolean;
};

export type AddCommentPayload = {
  creatorId: string;
  postId: string;
  content: string;
};

export type LikeUnlikeCommentType = {
  commentId: number;
  likeCount: number;
  postId: string;
  creatorId: string;
};
