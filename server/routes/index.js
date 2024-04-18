import express from "express";
import userRoute from "./userRoutes.js";
import carRoute from "./carRoutes.js";
import bookingRoute from "./bookingRoutes.js";
import reviewRoute from "./reviewRoutes.js";

const router = express.Router();

router.use("/users", userRoute);
router.use("/car", carRoute);
router.use("/bookings", bookingRoute);
router.use("/review", reviewRoute);

export default router;
