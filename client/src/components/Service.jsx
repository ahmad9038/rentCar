import React from "react";
import Heading from "./Heading";
import { benefits } from "../constants";
import grid from "../assets/grid.png";

const Service = () => {
  return (
    <div className=" flex flex-col justify-center items-center py-16 md:py-28 container relative z-2">
      <Heading
        className="text-center"
        title="Discover Our Exceptional Services "
      />
      <div className=" flex flex-wrap   justify-center gap-5 md:gap-10 mb-10 ">
        {benefits.map((item, index) => (
          <div
            key={index}
            className=" block   relative p-0.5 md:max-w-[24rem] bg-conic-gradient rounded-xl overflow-hidden"
          >
            <div className=" relative  z-2 flex flex-col h-full p-[1rem] lg:p-[2.4rem] pointer-events-none bg-n-8 rounded-xl">
              <h5 className=" text-[2rem] md:text-[2.5rem] leading-[2.5rem] md:leading-[3.5rem] mb-5 ">
                {item.title}
              </h5>
              <p className=" body-2 mb-6 text-n-3">{item.text}</p>
              <div className=" flex items-center mt-auto"></div>
            </div>
          </div>
        ))}
      </div>
      <div className=" absolute -z-50 top-0 -right-40 max-w-full opacity-50">
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

export default Service;
