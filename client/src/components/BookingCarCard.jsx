import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";
import RatingController from "./RatingController";
import SnackBarComponent from "./SnackBarComponent";
import { apiRequest } from "../utils";
import { MdOutlineStar } from "react-icons/md";
import { useBookedCarsContext } from "../contexts/bookedCarsContext";
import { useUserContext } from "../contexts/userContext";

const BookingCarCard = ({ booking }) => {
  const { user } = useUserContext();
  const { fetchBookings } = useBookedCarsContext();
  const { name, city, booked, _id } = booking.carId;
  const {
    status,
    totalDays,
    pricePerDay,
    startDate,
    endDate,
    review,
    renterId,
  } = booking;

  let diffInMilliseconds, diffInMinutes, diffInHours, remainingMinutes;

  if (status !== "cancelled" || status !== "completed") {
    diffInMilliseconds = new Date(endDate) - new Date();
    diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    diffInHours = Math.floor(diffInMinutes / 60);
    remainingMinutes = diffInMinutes % 60;
  } else {
    diffInMilliseconds = null;
    diffInMinutes = null;
    diffInHours = null;
    remainingMinutes = null;
  }

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  //review
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");

  //backend

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        url: `/review/add`,
        method: "POST",
        data: {
          userId: renterId,
          bookingId: booking._id,
          carId: _id,
          rating,
          comment,
        },
        token: user?.token,
      });

      setSeverity(res.success ? "success" : "");
      setMessage(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
      fetchBookings();
    }
  };

  // get single review
  const [singleReview, setSingleReview] = useState([]);
  let bookingId = booking._id;

  const fetchReview = async () => {
    try {
      const res = await apiRequest({
        url: `/review/getSingleReview/${bookingId}`,
        method: "GET",
        token: user?.token,
      });

      setSingleReview(res);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    fetchReview();
  }, []);

  return (
    <div className=" w-full rounded-lg overflow-hidden shadow-lg bg-n-8 border border-n-3 p-4">
      <div className=" py-3">
        <div className="font-bold text-xl mb-2 flex items-center">
          <FaCar className=" text-color-5 mr-2" />
          <span className=" leading-none ">{name}</span>
        </div>
      </div>
      <div className="pt-1 pb-2">
        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${
            status === "pending"
              ? "bg-yellow-500 text-yellow-900"
              : status === "completed"
              ? "bg-green-500 text-green-900"
              : status === "cancelled"
              ? "bg-red-500 text-red-100"
              : "bg-gray-500 text-gray-900" // Default color for unknown statuses
          }`}
        >
          {status}
        </span>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-color-5 mr-2" />
          <span className="text-sm font-semibold text-n-2">{city}</span>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-n-1">Start Date:</span>
            <span className="text-sm text-n-2 text-right">
              {new Date(startDate).toLocaleDateString("en-US", dateOptions)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-n-1">End Date:</span>
            <span className="text-sm text-n-2 text-right">
              {new Date(endDate).toLocaleDateString("en-US", dateOptions)}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-n-1">Total Days:</span>
            <span className="text-sm text-n-2">{totalDays}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-n-1">Price Per Day:</span>
            <span className="text-sm text-n-2">${pricePerDay}</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm font-bold text-n-1">Total Price:</span>
            <span className="text-sm text-n-2">
              ${(pricePerDay * totalDays).toFixed(2)}
            </span>
          </div>
        </div>

        {review == false && status !== "pending" ? (
          <div className="flex flex-col items-center justify-center mt-6">
            <h1 className=" text-lg font-bold text-n-1">Leave a Review</h1>
            <div className=" my-2 flex items-center">
              <RatingController
                value={rating}
                onChange={handleRatingChange}
                readOnly={false}
                card={true}
              />

              <p className=" leading-none ml-2 mt-1">{rating}</p>
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 mb-4 text-n-1 border rounded-lg focus:outline-none focus:shadow-outline"
              placeholder="Your comment"
            />
            {(comment == "" && rating >= 0) || rating == null ? (
              <></>
            ) : (
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              >
                {loading ? "Processing..." : "Submit Review"}
              </button>
            )}
          </div>
        ) : (
          <></>
        )}

        {status == "cancelled" || status == "completed" ? (
          <></>
        ) : (
          <div className=" mt-3">
            <p className=" text-n-3 text-center text-sm ">Completed In</p>
            <p className=" text-center text-sm">
              {diffInHours} H : {remainingMinutes} M
            </p>
          </div>
        )}

        {review == true ? (
          <div className=" mt-5">
            <h2 className=" text-center text-color-5">Your Review</h2>
            <div className=" flex gap-1">
              <MdOutlineStar className=" text-2xl text-yellow-400" />
              <h2 className=" text-n-3">({singleReview.rating})</h2>
            </div>
            <p className=" text-sm">{singleReview.comment}</p>
          </div>
        ) : (
          <></>
        )}
      </div>

      {booked ? (
        <button
          disabled
          className=" bg-n-4 flex items-center justify-center  w-full text-white font-bold py-2 px-4 rounded "
        >
          Booked
        </button>
      ) : (
        <Link
          to={`/bookCar/${_id}`}
          className=" bg-color-primary flex items-center justify-center hover:bg-color-primaryHover w-full transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Book Again
        </Link>
      )}

      <SnackBarComponent
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        severity={severity}
        message={message}
      />
    </div>
  );
};

export default BookingCarCard;
