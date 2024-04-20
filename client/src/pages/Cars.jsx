import React, { useState } from "react";
import { useCarContext } from "../contexts/carContext";
import CarCard from "../components/CarCard";
import { Skeleton } from "@mui/material";
import Pagination from "../components/Pagination";
import Header from "../components/Header";
import BackDropLoader from "../components/BackDropLoader";

const Cars = () => {
  const {
    loading,
    query,
    cars,
    setSearchedText,
    currentPage,
    getNextPage,
    getPrevPage,
    totalPages,
  } = useCarContext();

  console.log(totalPages);

  return (
    <>
      <div className="container mx-auto px-4 py-8 pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden ">
        <Header />
        <div className="flex flex-col-reverse gap-3 justify-between items-center mb-6 sm:flex-row py-5">
          <h1 className="text-2xl font-bold text-n-1">
            {cars.length} Cars Found
          </h1>

          <div className=" bg-conic-gradient rounded-md overflow-hidden w-[280px] pr-[2.5px]">
            <input
              name="text"
              required
              className=" w-full text-sm px-4 py-3 m-[1.5px] bg-n-8 text-n-2 rounded-md outline-none placeholder-n-3"
              placeholder="Search by City"
              value={query}
              onChange={(e) => {
                setSearchedText(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {loading
            ? [...Array(16)].map((_, index) => (
                <Skeleton
                  key={index}
                  sx={{ bgcolor: "grey.900" }}
                  variant="rectangular"
                  className=" w-full rounded-lg "
                  height={450}
                />
              ))
            : cars.map((car, index) => (
                <div className="relative" key={index}>
                  <CarCard loading={loading} key={car._id} car={car} />
                </div>
              ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          getNextPage={getNextPage}
          getPrevPage={getPrevPage}
        />
      </div>
    </>
  );
};

export default Cars;
