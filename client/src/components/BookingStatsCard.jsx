import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaCar } from "react-icons/fa";
import { Link } from "react-router-dom";

import "react-multi-carousel/lib/styles.css";
import CancelBookingModal from "./CancelBookingModal";
import { MdOutlineStar } from "react-icons/md";
import { apiRequest } from "../utils";
import { useUserContext } from "../contexts/userContext";

const BookingStatsCard = ({ booking }) => {
  const { user } = useUserContext();
  const { name, city, _id } = booking.carId;
  const { status, totalDays, pricePerDay, startDate, endDate, review } =
    booking;
  const { firstName, lastName } = booking.renterId;

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

  //for modal
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
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
        <div className="font-bold text-xl  flex items-center">
          <FaCar className=" text-color-5 mr-2" />
          <span className=" leading-none ">{name}</span>
        </div>
      </div>

      <p>
        Booked by: {firstName} {lastName}
      </p>
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

        {status === "cancelled" || status === "completed" ? (
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
            <h2 className=" text-center text-color-5">Customer Review</h2>
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

      <Link
        to={`/bookCar/${_id}`}
        className=" bg-color-primary flex items-center justify-center hover:bg-color-primaryHover w-full transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        View
      </Link>

      {status === "cancelled" || status === "completed" ? (
        <></>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className=" bg-red-400 flex items-center justify-center hover:bg-red-600 w-full transition-colors text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
        >
          Cancel Booking
        </button>
      )}

      <CancelBookingModal
        bookingId={booking._id}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default BookingStatsCard;
