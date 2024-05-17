import { CardMedia } from "@mui/material";

const ShowFeedMedia = ({
  fileType,
  base64Url,
}: {
  fileType: string | null;
  base64Url: string;
}) => {
  const fileTypeSplit = fileType?.split("/");
  const mainType = fileTypeSplit ? fileTypeSplit[0] : null;
  const subType = fileTypeSplit ? fileTypeSplit[1] : null;

  console.log("mainType", mainType);
  console.log("subType", subType);
  // console.log("base64Url", base64Url);

  return (
    <>
      {mainType === "video" && (
        <CardMedia
          component={"video"}
          width="100%"
          image={base64Url}
          controls
          autoPlay
        />
      )}
      {mainType === "image" && (
        <CardMedia
          component={"img"}
          width="100%"
          image={base64Url}
          alt="Paella dish"
        />
      )}
      {mainType === "application" && subType === "pdf" && (
       <iframe src={base64Url} title="My iframe" width="100%" height="300"></iframe>
      )}
    </>
  );
};

export default ShowFeedMedia;
