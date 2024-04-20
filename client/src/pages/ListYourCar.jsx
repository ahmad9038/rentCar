import React, { useEffect, useState } from "react";
import { useListCarsContext } from "../contexts/listCarsContext";
import CarCard from "../components/CarCard";
import { Link } from "react-router-dom";
import ConfirmModal from "../components/ConfirmModal";
import { Snackbar } from "@mui/material";
import Header from "../components/Header";
import BackDropLoader from "../components/BackDropLoader";

const ListYourCar = () => {
  const { fetchCars, listedCars, loading } = useListCarsContext();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSnackbarOpen(true);
  };

  useEffect(() => {
    fetchCars();
  }, []);

  //snackbar
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      {!loading ? (
        <div className="container mx-auto px-4 py-8 pt-[4.75rem] lg:pt-[5.25rem] overflow-hidden  ">
          <Header />
          {!listedCars.length <= 0 ? (
            <div className="flex flex-col gap-3 justify-between items-center mb-6  py-5">
              <div className="flex justify-between items-center mb-6 flex-col sm:flex-row w-full">
                <h1 className="text-2xl font-bold text-n-1">
                  Listed Cars ({listedCars.length})
                </h1>
                <div className=" flex flex-col sm:flex-row w-full sm:w-auto text-center gap-3">
                  <Link
                    to="/bookingStats"
                    className=" bg-color-primary hover:bg-color-primaryHover text-white font-bold py-2 px-4 rounded"
                  >
                    All Bookings
                  </Link>
                  <Link
                    to="/listNewCar"
                    onClick={() => setNewCarForm(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    List New Car
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {listedCars.map((car, index) => (
                  <div className=" relative" key={index}>
                    <CarCard key={car._id} car={car} />
                    <Link
                      to={`/editCar/${car._id}`}
                      className=" absolute top-6 left-6 bg-color-primary  px-4 py-1 rounded-md"
                    >
                      Edit
                    </Link>
                    <button
                      to={`/editCar/${car._id}`}
                      onClick={handleOpen}
                      className=" absolute top-15 left-6 bg-color-error px-4 py-1 rounded-md"
                    >
                      Delete
                    </button>
                    <ConfirmModal
                      handleClose={handleClose}
                      handleOpen={handleOpen}
                      open={open}
                      setOpen={setOpen}
                      carId={car._id}
                      images={car.images}
                      message={
                        "Are you sure you want to delete this listed car?"
                      }
                      button={"Confirm"}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className=" flex items-center justify-center w-full h-full mt-10">
              <Link
                to="/listNewCar"
                onClick={() => setNewCarForm(true)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                List Your First Car
              </Link>
            </div>
          )}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            message="Deleted Successfully"
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          />
        </div>
      ) : (
        <BackDropLoader />
      )}
    </>
  );
};

export default ListYourCar;
