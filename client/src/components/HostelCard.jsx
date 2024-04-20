import React from "react";
import { FaStar } from "react-icons/fa";
import { slideIn, textVariant } from "../utils/motion";
import { motion } from "framer-motion";

const Rating = ({ value }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <FaStar
        key={i}
        className={`h-5 w-5 ${i < value ? "text-yellow-500" : "text-gray-300"}`}
      />
    );
  }
  return <div className="flex items-center">{stars}</div>;
};

const HostelCard = ({ image, name, description, rating, city }) => {
  // const {image, name,description, rating, city} = hostel
  return (
    <motion.div
      variants={slideIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className="flex flex-col md:flex-row bg-white h-[300px] shadow-lg rounded-lg overflow-hidden mx-auto"
    >
      <div className="md:w-1/2 h-64 md:h-auto">
        <img src={image} alt={name} className="object-cover h-full w-full" />
      </div>
      <div className="md:w-1/2 p-4">
        <h3 className="text-xl font-bold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-4 flex items-center space-x-2">
          <Rating value={rating} />
          <span className="text-gray-500">({rating} reviews)</span>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.05 2.59a1 1 0 011.9 0l1.05 3.23a1 1 0 00.95.68h3.4a1 1 0 01.54 1.94l-2.75 2a1 1 0 00-.36 1.1l1.05 3.23a1 1 0 01-1.54 1.05l-2.75-2a1 1 0 00-1.1 0l-2.75 2a1 1 0 01-1.54-1.05l1.05-3.23a1 1 0 00-.36-1.1l-2.75-2a1 1 0 01.54-1.94h3.4a1 1 0 00.95-.68l1.05-3.23z"
              clipRule="evenodd"
            />
          </svg>
          {/* <span className="text-gray-800 font-medium">{price}</span> */}
          <span className="text-gray-500">/ night</span>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-gray-800 font-medium">{city}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default HostelCard;
