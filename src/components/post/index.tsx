import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { getPostResposeType, addCommentPayload } from "../../types/post.type";
import { getFileType } from "../../utils/base64.helper";
import { Images } from "../../assets";
import ResponsiveInputField from "../../lib/responsive-input";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import ChatIcon from "@mui/icons-material/Chat";
import ShowFeedMedia from "./show-feed-media";
import { useMutation } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import axiosInstance from "../../apis/axios";

export default function RecipeReviewCard({
  postData,
}: {
  postData: getPostResposeType;
}) {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [mediaType, setMediaType] = React.useState<string | null>(null);
  const [comment, setComment] = React.useState<string>("");

  useEffect(() => {
    if (postData.media) {
      const type = getFileType(postData.media);
      setMediaType(type);
    }
    console.log("postData =>", postData);
  }, [postData.comments]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    mutate({content: comment, creatorId: postData?.creatorId, postId: postData?._id});
    console.log("Adding comments on the frontend");
    postData.comments.unshift({
      id: -1,
      creatorId: postData?.creatorId,
      content: comment,
    })
  };

  let fullname = postData?.creator?.firstName;
  if (postData?.creator?.lastName)
    fullname += " " + postData?.creator?.lastName;

  const createdAt = postData?.createdAt ? new Date(postData?.createdAt) : null;

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <Card className="!rounded-lg">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {fullname ? fullname[0] : "D"}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title={fullname ?? "Demo User"}
        subheader={
          createdAt
            ? createdAt.toLocaleDateString("en-US", dateOptions)
            : "September 14, 2016"
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {postData.content}
        </Typography>
      </CardContent>
      {postData?.media && (
        <ShowFeedMedia fileType={mediaType} base64Url={postData.media} />
      )}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comments" onClick={handleExpandClick}>
          <ChatIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <div className="flex gap-2">
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
        </CardContent>
      </Collapse>
    </Card>
  );
}
