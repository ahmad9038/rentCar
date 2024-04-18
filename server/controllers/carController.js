import Car from "../models/carModel.js";
import cloudinary from "cloudinary";

const createCar = async (req, res) => {
  try {
    const {
      name,
      images,
      description,
      price,
      available,
      city,
      userId,
      ac,
      automatic,
      seatCapacity,
    } = req.body;

    const car = await Car.create({
      name,
      images,
      description,
      price,
      available,
      city,
      userId,
      ac,
      automatic,
      seatCapacity,
    });

    await car.save();

    res.status(201).json({
      success: true,
      message: "Created Successfully",
      car,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const fetchListedCars = async (req, res) => {
  try {
    const userId = req.query.userId;
    const cars = await Car.find({ userId }).populate("reviews");
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSingleCar = async (req, res) => {
  try {
    const carId = req.params.carId;

    const car = await Car.findById(carId).populate({
      path: "reviews",
      populate: {
        path: "userId",
        select: "firstName lastName",
      },
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json(car);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

const generateDeleteSignature = async (req, res) => {
  try {
    const { public_id, carId } = req.body;
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { public_id: public_id, timestamp: timestamp },
      "OquwQSFYiYRYSUXgNwXITZq5LwA"
    );

    // Find the car document by its _id
    const car = await Car.findById(carId);

    // Check if the car exists
    if (!car) {
      console.log("Car not found");
      return res.status(404).send("Car not found");
    }

    // Remove the image with the matching public_id from the images array
    car.images = car.images.filter((image) => image.public_id !== public_id);

    // Save the updated car document
    await car.save();

    console.log("Image deleted successfully from car:", carId);

    res.json({ signature, timestamp });
  } catch (error) {
    console.error("Error generating delete signature:", error);
    res.status(500).send("Internal Server Error");
  }
};

const updateCar = async (req, res) => {
  try {
    const {
      name,
      images,
      description,
      price,
      available,
      city,
      userId,
      ac,
      automatic,
      seatCapacity,
      carId,
    } = req.body; // Get the updated car data from the request body

    console.log(images);

    // Find the car by ID and update it with the new data
    const car = await Car.findByIdAndUpdate(
      carId,
      {
        $set: {
          name,
          description,
          price,
          available,
          city,
          userId,
          ac,
          automatic,
          seatCapacity,
        },
        $push: { images: { $each: images } }, // Use $push with $each to add multiple images
      },
      { new: true }
    ); // The { new: true } option returns the updated document

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Send the updated car data back to the client
    res.status(200).json({
      success: true,
      message: "Updated Successfully",
      car,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteListedCar = async (req, res) => {
  try {
    const { carId } = req.body;

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Send the updated car data back to the client
    res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      deletedCar,
    });
  } catch (error) {
    console.error("Error generating delete signature:", error);
    res.status(500).send("Internal Server Error");
  }
};

const showAllCars = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit) || 8;
    const query = req.query.search;

    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;
    // const totalCars = await Car.countDocuments({ available: true });

    let totalCars;
    let results;
    if (query) {
      results = await Car.find({
        city: { $regex: new RegExp(query, "i") },
        available: true,
      });
    } else {
      results = await Car.find({ available: true }).populate("reviews");
    }

    totalCars = results.length;

    let data = results.slice(startIndex, lastIndex);
    let totalPages = Math.ceil(totalCars / limit);

    res.status(200).json({
      totalCars: totalCars,
      totalPages: totalPages,
      next: { page: page + 1 },
      prev: { page: page - 1 },
      cars: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "not getting data due to server error" });
  }
};

export {
  createCar,
  fetchListedCars,
  getSingleCar,
  generateDeleteSignature,
  updateCar,
  deleteListedCar,
  showAllCars,
};
