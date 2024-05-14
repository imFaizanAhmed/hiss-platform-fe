import { useQuery } from "react-query";
import RecipeReviewCard from "../../components/post";
import axiosInstance from "../../apis/axios";
import { useEffect, useState } from "react";
import { getPostResposeType } from "../../types/post.type";

const Posts = () => {
  const [postData, setPostData] = useState<getPostResposeType>();
  // image content
  // const id = "66007a4cef2585f1fa454fe6";

  const { error, data, isLoading } = useQuery({
    queryKey: ["get-all-posts"],
    queryFn: () => axiosInstance.get(`post/all`),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      if (data.data?.file) {
        data.data.fileUrl = URL.createObjectURL(data.data?.file);
      }
      setPostData(data.data);
    }
  }, [data && !error]);

  return (
    <>
      {!isLoading && postData ? (
        <div className="w-full mt-8 rounded-lg">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <div key={index} className={index !== 4 ? "mb-4" : ""}>
              <RecipeReviewCard postData={postData} />
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
