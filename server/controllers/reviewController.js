import Review from "../models/reviewModel.js";
import Car from "../models/carModel.js";
import Rental from "../models/BookingModel.js";

const postReview = async (req, res) => {
  try {
    const { userId, bookingId, rating, comment, carId } = req.body;

    const review = new Review({
      userId,
      bookingId,
      rating,
      comment,
    });

    await review.save();

    const car = await Car.findById(carId);
    car.reviews.push(review._id);
    await car.save();

    // Find the booking and update the review flag to true
    const booking = await Rental.findById(bookingId);
    booking.review = true;
    await booking.save();

    res
      .status(200)
      .json({ success: true, message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getReviews = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId).populate("reviews");

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.status(200).json(car.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleReview = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const review = await Review.findOne({ bookingId });

    if (!review) {
      return res.json({ success: false, message: "review not found" });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { postReview, getReviews, getSingleReview };
