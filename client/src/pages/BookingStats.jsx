import React from "react";
import Header from "../components/Header";
import { useBookedCarsContext } from "../contexts/bookedCarsContext";
import { Skeleton } from "@mui/material";
import BookingStatsCard from "../components/BookingStatsCard";

const BookingStats = () => {
  const { loading, bookingStats } = useBookedCarsContext();

  return (
    <div className="pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden">
      <Header />
      <div className="container mx-auto px-4 py-8 ">
        <div
          className={`${
            bookingStats.length > 0
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
              : "  "
          }`}
        >
          {loading ? (
            [...Array(10)].map((_, index) => (
              <Skeleton
                key={index}
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                className=" w-full rounded-lg "
                height={350}
              />
            ))
          ) : bookingStats && bookingStats.length > 0 ? (
            bookingStats.map((booking, index) => (
              <div className="relative" key={index}>
                <BookingStatsCard key={booking._id} booking={booking} />
              </div>
            ))
          ) : (
            <div className=" w-full flex-col  flex items-center justify-center">
              <p>No bookings yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingStats;
