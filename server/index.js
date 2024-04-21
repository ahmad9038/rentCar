import express from "express";
import cors from "cors";
import dbConnection from "./dbConnection.js";
import dotenv from "dotenv";
import router from "./routes/index.js";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// const viewsPath = path.join(process.cwd(), "views");
// app.use(express.static(viewsPath));
app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());
app.use(express.json());


dbConnection();

app.use(router);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
