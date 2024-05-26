// src/hooks/useFetchPosts.ts

import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../apis/axios";
import { getCommentsApiResponse } from "../../types/post.type";

const fetchComments = async (data: any) => {
  const { pageParam = 1, queryKey } = data;
  const [, postId] = queryKey;
  const limit = 4;
  const response = await axiosInstance.get<getCommentsApiResponse[]>(
    `post/get-post-comments/${postId}?page=${pageParam}&limit=${limit}`
  );
  return response.data;
};

const useFetchComments = ({ postId }: { postId: string }) => {
  return useInfiniteQuery<getCommentsApiResponse[], Error>(
    ["get-post-comments", postId],
    fetchComments,
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage && lastPage[0].hasMore) {
          // Ensure you have this property in your API response to know if there are more pages
          return allPages.length + 1;
        }
        return undefined; // No more pages to fetch
      },
      refetchOnWindowFocus: false,
    }
  );
};

export default useFetchComments;
