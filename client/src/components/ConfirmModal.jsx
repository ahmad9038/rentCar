import React, { useState } from "react";
import { Modal, Box, Alert, Snackbar } from "@mui/material";
import { apiRequest } from "../utils";
import Loader from "./Loader";
import { useListCarsContext } from "../contexts/listCarsContext";
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

const ConfirmModal = ({ handleClose, open, carId, message, button }) => {
  const { user } = useUserContext();
  const { fetchCars } = useListCarsContext();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const res = await apiRequest({
        url: "/car/deleteListedCar",
        data: {
          carId,
        },
        method: "POST",
        token: user?.token,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      handleClose();
      fetchCars();
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
          <p className="text-lg text-black">{message}</p>
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
              {loading ? <Loader /> : `${button}`}
            </button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ConfirmModal;
