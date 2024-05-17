import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { getPostResposeType } from "../../types/post.type";
import { getFileType } from "../../utils/base64.helper";
import { Images } from "../../assets";
import ResponsiveInputField from "../../lib/responsive-input";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import ChatIcon from "@mui/icons-material/Chat";
import ShowFeedMedia from "./show-feed-media";

export default function RecipeReviewCard({
  postData,
}: {
  postData: getPostResposeType;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const [mediaType, setMediaType] = React.useState<string | null>(null);

  useEffect(() => {
    if (postData.media) {
      const type = getFileType(postData.media);
      setMediaType(type);
    }
  }, [postData]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
        <IconButton aria-label="share">
          <DoubleArrowIcon />
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
            <ResponsiveInputField placeholder="Write valuable comment" Icon={DoubleArrowIcon} />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
