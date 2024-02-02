import { Fragment } from "react";
import RecipeReviewCard from "../../components/post";

const Posts = () => {
  return (
    <div className="w-full mt-8 rounded-lg">
      {[0, 1, 2, 3, 4].map((_, index) => (
        <div  key={index} className={index !== 4 ? 'mb-4' : ''}>
            <RecipeReviewCard />
        </div>
      ))}
    </div>
  );
};

export default Posts;
