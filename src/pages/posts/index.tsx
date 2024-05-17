import { useInfiniteQuery } from "react-query";
import RecipeReviewCard from "../../components/post";
import axiosInstance from "../../apis/axios";
import { useEffect, useState } from "react";
import { getPostResposeType } from "../../types/post.type";

const Posts = () => {
  const [postData, setPostData] = useState<getPostResposeType[]>();
  // image content
  // const id = "66007a4cef2585f1fa454fe6";
  const page = 1, limit = 2;

  const { error, data, isLoading } = useInfiniteQuery({
    queryKey: ["get-all-posts"],
    queryFn: () => axiosInstance.get(`post/all?page=${page}&limit=${limit}`),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      console.log("data => ", data);
      // if (data.data?.file) {
      //   data.data.fileUrl = URL.createObjectURL(data.data?.file);
      // }
      // setPostData(data.data);
    }
  }, [data && !error]);

  return (
    <>
      {!isLoading && postData ? (
        <div className="w-full mt-8 rounded-lg">
          {postData.map((post, index) => (
            <div key={index} className={index !== 4 ? "mb-4" : ""}>
              <RecipeReviewCard postData={post} />
            </div>
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default Posts;
