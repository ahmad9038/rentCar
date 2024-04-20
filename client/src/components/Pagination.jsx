import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, getPrevPage, getNextPage }) => {
  return (
    <div className=" mt-20 mb-20">
      <div className=" flex items-center justify-center">
        <button
          onClick={getPrevPage}
          className=" cursor-pointer flex items-center justify-center p-2 border border-n-1 rounded-full w-12 h-12  text-center"
        >
          <FaArrowLeft />
        </button>
        <span className=" text-color-primary  mx-5">
          {currentPage} <span className=" text-sm text-n-3">of</span>{" "}
          {totalPages}
        </span>
        <button
          onClick={getNextPage}
          className="cursor-pointer flex items-center justify-center p-2 border border-n-1 rounded-full w-12 h-12  text-center"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
