import Rental from "../models/BookingModel.js";
import Car from "../models/carModel.js";

const BookCar = async (req, res) => {
  const {
    carId,
    renterId,
    startDate,
    endDate,
    totalDays,
    pricePerDay,
    ownerId,
  } = req.body;
  try {
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    if (car.available === false) {
      return res
        .status(400)
        .json({ success: false, message: "Car not available" });
    }

    if (car.booked === true) {
      return res
        .status(400)
        .json({ success: false, message: "Car already booked" });
    }

    const booking = await Rental.create({
      carId,
      renterId,
      ownerId,
      startDate,
      endDate,
      totalDays,
      pricePerDay,
    });

    car.booked = true;
    await car.save();

    await booking.checkAndUpdateStatus();

    res.status(201).json({
      success: true,
      message: "Booked Successfully",
      booking,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookedCars = async (req, res) => {
  try {
    const renterId = req.params.renterId;

    const bookings = await Rental.find({ renterId }).populate("carId");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No Bookings" });
    }

    for (let booking of bookings) {
      await booking.checkAndUpdateStatus(Car);
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookingStats = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const bookings = await Rental.find({ ownerId }).populate("carId").populate({
      path: "renterId",
      select: "firstName lastName",
    });

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No Bookings" });
    }

    for (let booking of bookings) {
      await booking.checkAndUpdateStatus(Car);
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    const booking = await Rental.findByIdAndUpdate(
      bookingId,
      { status: "cancelled" },
      { new: true }
    );

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    await Car.findByIdAndUpdate(booking.carId, { booked: false });

    await booking.checkAndUpdateStatus(Car);

    res
      .status(200)
      .json({ success: true, message: "Booking canceled successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { BookCar, getBookedCars, getBookingStats, cancelBooking };
