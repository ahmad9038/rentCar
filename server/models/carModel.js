import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    available: {
      type: Boolean,
      default: true,
    },
    city: {
      type: String,
      default: false,
      required: true,
    },
    ac: {
      type: Boolean,
      default: false,
    },
    automatic: {
      type: Boolean,
      default: false,
    },
    seatCapacity: {
      type: Number,
      default: 2,
    },
    booked: {
      type: Boolean,
      default: false,
    },
    reviews: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Review",
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
