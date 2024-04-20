import React from "react";
import Button from "./Button";
import car from "../assets/hero/car.png";
import grid from "../assets/grid.png";

const Hero = () => {
  return (
    <div className="relative container py-10  flex flex-col justify-center">
      <div className=" w-full mx-auto text-center max-w-[1000px]">
        <h1 className=" font-semibold text-[2.2rem] md:text-[3rem] lg:text-[3.25rem] md:leading-[3.75rem] lg:leading-[4.5rem] leading-[3rem]  mb-6">
          Embark on{" "}
          <span className=" text-color-primary ">Unforgettable Journeys</span>{" "}
          with Our Premium Car Rentals
        </h1>
        <p className=" body-1 lg:mx-auto text-n-3 mb-6 text-center">
          Experience the convenience and luxury with our selection of
          top-quality rental cars
        </p>

        <Button className="mb-20" />
      </div>
      <div className=" relative  max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
        <img
          src={car}
          className="   w-full  "
          width={1024}
          height={490}
          alt="AI"
        />
      </div>
      <div className=" absolute -z-50 top-0 -left-40 max-w-full opacity-50">
        <img
          src={grid}
          className=" w-full "
          width={550}
          height={550}
          alt="Grid"
        />
      </div>
    </div>
  );
};

export default Hero;
