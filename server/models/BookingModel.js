import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true,
  },
  renterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  totalDays: {
    type: Number,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "active", "completed", "cancelled"],
    default: "pending",
  },
  review: {
    type: Boolean,
    required: true,
    default: false,
  },
});

rentalSchema.methods.checkAndUpdateStatus = async function (Car) {
  const now = new Date();
  if (this.endDate <= now && this.status !== "completed") {
    this.status = "completed";
    await this.save();

    // Set car.booked to false
    const car = await Car.findById(this.carId);
    car.booked = false;
    await car.save();
  }
};

const Rental = mongoose.model("Rental", rentalSchema);

export default Rental;
