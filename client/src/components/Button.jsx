import React from "react";

const Button = ({ className }) => {
  return (
    <div
      className={` ${className} w-auto  h-14 p-[2px] bg-conic-gradient text-white rounded-md shadow-md inline-block `}
    >
      <a
        href="/cars"
        className=" bg-n-8 flex w-full h-full   rounded-md px-8 uppercase text-sm"
      >
        <button>Rent Car</button>
      </a>
    </div>
  );
};

export default Button;
