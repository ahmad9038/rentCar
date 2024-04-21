import express from "express";
import {
  changePassword,
  login,
  register,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from "../controllers/userController.js";
import path from "path";
const router = express.Router();
const __dirname = path.resolve(path.dirname(""));
import ejs from 'ejs';

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:userId/:token", verifyEmail);

router.get("/verified", (req, res) => {
  const filePath = path.join(__dirname, "./server/../views/verifiedpage.html");
  // Render the HTML using ejs
  ejs.renderFile(filePath, {}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error rendering verification page');
    } else {
      res.send(data);
    }
  });
});

//password reset
router.post("/request-passwordreset", requestPasswordReset);
router.get("/reset-password/:userId/:token", resetPassword);
router.post("/reset-password", changePassword);

router.get("/resetpassword", (req, res) => {
  const filePath = path.join(
    __dirname,
    "./server/../views/passwordresetpage.html"
  );
  res.sendFile(filePath);
});

export default router;
