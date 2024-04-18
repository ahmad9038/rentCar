import express from "express";
import {
  createCar,
  deleteListedCar,
  fetchListedCars,
  generateDeleteSignature,
  getSingleCar,
  showAllCars,
  updateCar,
} from "../controllers/carController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/list", auth, createCar);
router.get("/fetchListedCars", auth, fetchListedCars);
router.get("/getSingleCar/:carId", getSingleCar);
router.post("/updateCar", auth, updateCar);
router.post("/deleteListedCar", auth, deleteListedCar);
router.get("/getAllCars", showAllCars);

// delete cloudinary image
router.post("/generate-delete-signature", generateDeleteSignature); // Add the new route

export default router;
