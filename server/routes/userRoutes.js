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

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:userId/:token", verifyEmail);

router.get("/verified", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/verifiedpage.html"));
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
