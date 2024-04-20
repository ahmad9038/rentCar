import React from "react";
import Heading from "./Heading";
import CarCard from "./CarCard";
import grid from "../assets/grid.png";

const carData = {
  image:
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Replace with your car image URL
  model: "2024 Toyota Camry",
  description:
    "A spacious and comfortable sedan perfect for your next road trip.",
  price: 50, // Price per day
  availability: true,
  location: "Los Angeles, CA",
  specifications: [
    "4-door sedan",
    "Automatic transmission",
    "Fuel-efficient engine",
    "Sunroof",
  ],
  reviews: [
    // Provide an array of review objects if you have them
    // { author: 'John Doe', rating: 4, content: 'Great car!' },
  ],
  rating: 4, // Average rating (out of 5)
};

const TopRated = () => {
  return (
    <div className="  py-20 container relative z-2">
      <Heading className="text-center" title="Top Rated Rented Cars " />
      <div className=" flex flex-wrap gap-10 mb-10 ">
        <CarCard car={carData} />
        <CarCard car={carData} />
        <CarCard car={carData} />
      </div>
      <div className=" absolute -z-50 top-0 -left-52 max-w-full opacity-50">
        <img src={grid} className=" w-full " alt="Grid" />
      </div>
    </div>
  );
};

export default TopRated;
