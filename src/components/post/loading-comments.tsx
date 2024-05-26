import { Skeleton } from "@mui/material";

const LoadingComments = () => {
  return (
    <div className="w-full flex gap-2 mb-2">
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <div className="w-[95%]">
        <Skeleton animation="wave" variant="rounded" height={40} />
      </div>
    </div>
  );
};

export default LoadingComments;
