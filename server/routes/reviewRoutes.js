import express from "express";
import {
  getReviews,
  getSingleReview,
  postReview,
} from "../controllers/reviewController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", auth, postReview);
router.get("/getReviews/:carId", auth, getReviews);
router.get("/getSingleReview/:bookingId", auth, getSingleReview);

export default router;
