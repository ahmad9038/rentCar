import express from "express";
import {
  BookCar,
  cancelBooking,
  getBookedCars,
  getBookingStats,
} from "../controllers/bookingController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/bookCar", auth, BookCar);
router.get("/getBookedCars/:renterId", auth, getBookedCars);
router.get("/getBookingStats/:ownerId", auth, getBookingStats);

// cancel booking
router.post("/cancelBooking", cancelBooking);

export default router;
