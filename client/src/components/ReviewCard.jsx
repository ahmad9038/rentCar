import React from "react";
import { FaStar } from "react-icons/fa";
import RatingController from "./RatingController";

const ReviewCard = ({ review }) => {
  const { comment, rating, createdAt } = review;
  return (
    <div className="w-full  mx-auto  rounded-xl  overflow-hidden ">
      <div className="md:flex">
        <div className=" py-5">
          <div className="uppercase tracking-wide text-md  text-indigo-500 font-semibold">
            {review.userId.firstName} {review.userId.lastName}
          </div>
          <p className="block mt-1 text-sm leading-tight font-medium text-n-3">
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2 text-lg text-n-1">{comment}</p>
          <div className="flex items-center pb-1">
            <RatingController readOnly={true} value={rating} />
          </div>
        </div>
      </div>
      <hr className="  border-n-6" />
    </div>
  );
};

export default ReviewCard;
