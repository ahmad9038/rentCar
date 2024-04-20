import React from "react";
import { FaMapMarkerAlt, FaCar, FaStar, FaSnowflake } from "react-icons/fa";
import { TbAutomaticGearbox } from "react-icons/tb";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { Link } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import RatingController from "./RatingController";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 280 },
    items: 1,
    slidesToSlide: 1,
  },
};

const CarCard = ({ car, loading }) => {
  const { images } = car;

  function calculateOverallRating(reviews) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;
    return average;
  }

  let overallRating = 0;
  if (!loading) {
    overallRating = calculateOverallRating(car.reviews);
  }

  return (
    <div className=" w-full rounded-lg overflow-hidden shadow-lg bg-n-8 border border-n-3 p-4">
      {car.booked ? (
        <div className="  bg-color-5 absolute z-10 rounded-md right-5 top-5  px-2 py-1">
          Booked
        </div>
      ) : (
        <></>
      )}
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={images.length <= 1 ? false : true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        removeArrowOnDeviceType={
          images.length <= 1 ? ["desktop", "tablet", "mobile"] : []
        }
      >
        {images.map((image, index) => {
          return (
            <div key={index}>
              <img
                className="w-full h-48 object-cover object-top rounded-lg"
                src={image.url}
                // alt={image}
              />
            </div>
          );
        })}
      </Carousel>
      <div className=" py-3">
        <div className="font-bold text-xl mb-2 flex items-center">
          <FaCar className=" text-color-5 mr-2" />
          <span className=" leading-none ">{car.name}</span>
        </div>
        <p className=" text-n-3 text-sm">
          {car.description.split(" ").slice(0, 10).join(" ") +
            (car.description.split(" ").length > 10 ? "..." : "")}
        </p>
      </div>
      <div className="pt-1 pb-2">
        <span className="inline-block bg-n-1  rounded-full px-3 py-1 text-sm font-bold text-n-8 mr-2 mb-2">
          ${car.price} / day
        </span>
        {!car.available ? (
          <span className="inline-block bg-color-error  rounded-full px-3 py-1 text-sm font-bold text-n-8 mr-2 mb-2">
            Not available
          </span>
        ) : (
          <></>
        )}

        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-color-5 mr-2" />
          <span className="text-sm font-semibold text-n-2">{car.city}</span>
        </div>

        <div className="items-center  w-full flex flex-wrap gap-4 ">
          {car.ac ? (
            <div className="flex items-center mb-2">
              <FaSnowflake className={`mr-1 "text-n-1 text-lg"}`} />
              <span className="text-md font-semibold text-n-1">AC</span>
            </div>
          ) : (
            <></>
          )}
          {car.automatic ? (
            <div className="flex items-center mb-2 ">
              <TbAutomaticGearbox className={`mr-1 ${"text-n-1 text-lg"}`} />
              <span className="text-md font-semibold text-n-1">Auto</span>
            </div>
          ) : (
            <></>
          )}
          <div className="flex items-center mb-2">
            <MdAirlineSeatReclineNormal className=" text-n-1 mr-1 text-xl" />
            <span className="text-md font-semibold text-n-1">
              {car.seatCapacity}
            </span>
          </div>
        </div>

        <div className="flex items-center pb-1">
          <RatingController value={overallRating} readOnly={true} card={true} />
          <span className="text-sm font-semibold text-n-3 ml-1">
            ({car.reviews.length})
          </span>
        </div>
      </div>

      <Link
        to={`/bookCar/${car._id}`}
        className=" bg-color-primary flex items-center justify-center hover:bg-color-primaryHover w-full transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        View
      </Link>
    </div>
  );
};

export default CarCard;
