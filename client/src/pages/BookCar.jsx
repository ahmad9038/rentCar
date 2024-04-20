import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiRequest } from "../utils";
import Header from "../components/Header";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { FaMapMarkerAlt, FaStar, FaSnowflake } from "react-icons/fa";
import { TbAutomaticGearbox } from "react-icons/tb";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { Link } from "react-router-dom";
import BookingModal from "../components/BookingModal";
import { useUserContext } from "../contexts/userContext";
import ReviewCard from "../components/ReviewCard";
import RatingController from "../components/RatingController";
import BackDropLoader from "../components/BackDropLoader";

const BookCar = () => {
  const { carId } = useParams();
  const [car, setCar] = useState();
  const [loading, setLoading] = useState(true);
  const [rentalDays, setRentalDays] = useState("1");
  const { user } = useUserContext();

  function calculateOverallRating(reviews) {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    const average = total / reviews.length;
    return average;
  }

  let overallRating = 0;
  if (!loading) {
    overallRating = calculateOverallRating(car.reviews);
  }

  //for modal
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = "";

  if (car && car.createdAt) {
    const date = new Date(car.createdAt);
    formattedDate = date.toLocaleDateString("en-US", options);
  }

  const fetchCar = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        url: `/car/getSingleCar/${carId}`,
        method: "GET",
        token: user?.token,
      });

      setCar(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCar();
  }, [carId]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 280 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return loading ? (
    <BackDropLoader />
  ) : (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <div className="container mx-auto px-4 py-8 ">
        <div className=" my-3">
          <h3 className=" h3 leading-none">{car.name}</h3>
          <p className=" text-gray-400 text-sm">Since {formattedDate}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 ">
          <div className=" w-full lg:w-[60%]">
            <Carousel
              swipeable={false}
              draggable={false}
              showDots={car.images.length <= 1 ? false : true}
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
                car.images.length <= 1 ? ["desktop", "tablet", "mobile"] : []
              }
            >
              {car.images.map((image, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-[200px] sm:h-[400px] md:h-[500px]  relative"
                  >
                    <img
                      className="absolute inset-0 w-full h-full object-cover rounded-lg"
                      src={image.url}
                      alt={image}
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>

          <div className="flex flex-col justify-between w-full">
            <div className=" py-3">
              <p className=" text-n-1 text-md   lg:text-lg">
                {car.description}
              </p>
            </div>
            <div className="pt-1 pb-2">
              <span className="inline-block bg-n-1  rounded-full px-3 py-1 text-sm font-bold text-n-8 mr-2 mb-5">
                ${car.price} / day
              </span>
              <span
                className={`inline-block ${
                  car.available ? "bg-green-300" : "bg-red-300"
                } rounded-full px-3 py-1 text-sm font-semibold text-n-8 mr-2 mb-2`}
              >
                {car.available ? "Available" : "Unavailable"}
              </span>
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-color-5 mr-2" />
                <span className="text-sm font-semibold text-n-2">
                  {car.city}
                </span>
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
                    <TbAutomaticGearbox
                      className={`mr-1 ${"text-n-1 text-lg"}`}
                    />
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

              <div className="flex items-center">
                <RatingController readOnly={true} value={overallRating} />
                <span className="text-sm font-semibold text-n-3 ml-1">
                  ({car.reviews.length})
                </span>
              </div>

              <div className=" mt-5">
                <label className="block text-sm font-medium text-n-2 ">
                  Select Number of Rental Days
                </label>
                <select
                  id="rental-days"
                  name="rental-days"
                  value={rentalDays}
                  onChange={(e) => {
                    setRentalDays(e.target.value);
                  }}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  {[...Array(10).keys()].map((day) => (
                    <option key={day} value={day + 1}>
                      {day + 1} {day + 1 === 1 ? "day" : "days"}
                    </option>
                  ))}
                </select>

                <p className=" pt-1 text-sm">
                  ${(car.price * rentalDays).toFixed(2)}{" "}
                  <span className=" text-n-4">for {rentalDays} Days</span>
                </p>
              </div>

              {car.booked ? (
                <button
                  disabled
                  className=" mt-3 bg-n-4 flex items-center justify-center w-full text-white font-bold py-2 px-4 rounded "
                >
                  Booked
                </button>
              ) : (
                <Link
                  // to={`/bookCar/${car._id}`}
                  onClick={() => setOpen(true)}
                  className=" mt-3 bg-color-primary flex items-center justify-center hover:bg-color-primaryHover w-full transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Proceed to Rent
                </Link>
              )}
            </div>
          </div>
        </div>
        {car.reviews.map((review, index) => {
          return <ReviewCard key={index} review={review} />;
        })}
      </div>
      <BookingModal
        open={open}
        handleClose={handleClose}
        rentalDays={rentalDays}
        totalPrice={(car.price * rentalDays).toFixed(2)}
        pricePerDay={car.price}
        carId={car._id}
        ownerId={car.userId}
        user={user}
      />
    </div>
  );
};

export default BookCar;
