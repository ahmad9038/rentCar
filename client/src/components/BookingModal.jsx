import React, { useState } from "react";
import Loader from "./Loader";
import { Modal, Box } from "@mui/material";
import { useListCarsContext } from "../contexts/listCarsContext";
import { apiRequest } from "../utils";
import SnackBarComponent from "./SnackBarComponent";
import { useNavigate } from "react-router-dom";
import { useBookedCarsContext } from "../contexts/bookedCarsContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const BookingModal = ({
  handleClose,
  open,
  rentalDays,
  totalPrice,
  pricePerDay,
  carId,
  user,
  ownerId,
}) => {
  const navigate = useNavigate();
  const { fetchBookings } = useBookedCarsContext();
  const { fetchCars } = useListCarsContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  //calculate end date
  const calculateEndDate = (inputDate, additionalDays) => {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + additionalDays); // Add the additional days
    return date;
  };

  const endDate = calculateEndDate(new Date(), parseInt(rentalDays, 10));

  const navigateToOtherURL = () => {
    navigate("/bookings"); // your desired URL here
  };

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("");

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await apiRequest({
        url: "/bookings/bookCar",
        data: {
          carId,
          renterId: user._id,
          ownerId,
          startDate: new Date(),
          endDate,
          totalDays: rentalDays,
          pricePerDay,
        },
        method: "POST",
        token: user?.token,
      });

      setSeverity(res.success ? "success" : "error");
      setMessage(res.message);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
      fetchCars();
      setSnackbarOpen(true);
      fetchBookings();
      navigateToOtherURL();
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg w-full sm:w-[400px] p-6">
          {user ? (
            <>
              <h3 className="text-lg font-semibold text-gray-800">
                Rental Summary
              </h3>
              <div className="mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm  text-gray-600 font-bold">
                    Car ID:
                  </span>
                  <span className="text-sm text-gray-800">{carId}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-gray-600">
                    Start Date:
                  </span>
                  <span className="text-sm text-gray-800 text-right">
                    {new Date().toLocaleDateString("en-US", dateOptions)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-gray-600">
                    End Date:
                  </span>
                  <span className="text-sm text-gray-800 text-right">
                    {endDate.toLocaleDateString("en-US", dateOptions)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-gray-600">
                    Total Days:
                  </span>
                  <span className="text-sm text-gray-800">{rentalDays}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-gray-600">
                    Price Per Day:
                  </span>
                  <span className="text-sm text-gray-800">${pricePerDay}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm font-bold text-gray-600">
                    Total Price:
                  </span>
                  <span className="text-sm text-gray-800">${totalPrice}</span>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={handleClose}
                  className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
                >
                  Cancel
                </button>
                {user.token == undefined ? (
                  <button className="text-white bg-blue-500 hover:bg-blue-600 ml-4 px-4 py-2 rounded transition duration-300">
                    <a href="/login">Login</a>
                  </button>
                ) : (
                  <button
                    onClick={handleConfirm}
                    className="text-white bg-blue-500 hover:bg-blue-600 ml-4 px-4 py-2 rounded transition duration-300"
                  >
                    {loading ? "Processing..." : "Book Now"}
                  </button>
                )}
              </div>
            </>
          ) : (
            <button>Login</button>
          )}
        </Box>
      </Modal>

      <SnackBarComponent
        snackbarOpen={snackbarOpen}
        setSnackbarOpen={setSnackbarOpen}
        severity={severity}
        message={message}
      />
    </>
  );
};

export default BookingModal;
