import { useInfiniteQuery } from "react-query";
import RecipeReviewCard from "../../components/post";
import axiosInstance from "../../apis/axios";
import { ApiResponse } from "../../types/post.type";
import { useEffect, useRef } from "react";

const Posts = () => {
  const fetchPosts = async ({ pageParam = 1 }) => {
    const limit = 2;
    const response = await axiosInstance.get<ApiResponse>(
      `post/all?page=${pageParam}&limit=${limit}`
    );
    return response.data;
  };

  const useFetchPosts = () => {
    return useInfiniteQuery<ApiResponse, Error>("get-all-posts", fetchPosts, {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.hasMore) {
          // Ensure you have this property in your API response to know if there are more pages
          return allPages.length + 1;
        }
        return undefined; // No more pages to fetch
      },
      refetchOnWindowFocus: false,
    });
  };

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchPosts();

  const observerElem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // infinite scroll functionality
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      {
        rootMargin: '100px',
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
  }, [fetchNextPage, hasNextPage]);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="w-full mt-8 rounded-lg">
        {data?.pages.map((page, index) => {
          console.log("page =>", page);
          return (
            <div key={index}>
              {page?.data.map((post, index) => (
                <div key={index} className={index !== 4 ? "mb-4" : ""}>
                  <RecipeReviewCard postData={post} />
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div ref={observerElem} style={{ height: '20px' }} />
      {isFetchingNextPage && <div>Loading more...</div>}
      {!hasNextPage && <div>No More Posts</div>}
    </>
  );
};

export default Posts;
