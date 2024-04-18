import mongoose from "mongoose";

const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(async () => {
      console.log("Connected!");
    })
    .catch((err) => {
      console.log("Error connecting to database: ", err);
    });
};

export default dbConnection;
