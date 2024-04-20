import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import { apiRequest } from "../utils";
import Loader from "./Loader";
import SnackBarComponent from "./SnackBarComponent";
import { useBookedCarsContext } from "../contexts/bookedCarsContext";
import { useUserContext } from "../contexts/userContext";

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

const CancelBookingModal = ({ handleClose, open, bookingId }) => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { fetchBookingStats } = useBookedCarsContext();

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [severity, setSeverity] = useState("");

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await apiRequest({
        url: "/bookings/cancelBooking",
        data: {
          bookingId,
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
      setSnackbarOpen(true);
      fetchBookingStats();
    }
  };

  return (
    <>
      {" "}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg w-[350px] sm:w-[400px]">
          <p className="text-lg text-black">
            Are you sure you want to cancel this booking?
          </p>
          <div className="flex justify-end  mt-4">
            <button
              onClick={handleClose}
              className=" bg-color-error mr-2 px-2 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className=" bg-color-primary px-2 py-2 rounded-md "
            >
              {loading ? <Loader /> : `Confirm`}
            </button>
          </div>
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

export default CancelBookingModal;
