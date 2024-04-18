import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import { hashString } from "./index.js";
import Verification from "../models/emailVerification.js";
import PasswordReset from "../models/passwordReset.js";

dotenv.config();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASSWORD,
  },
});

const sendVerificationEmail = async (user, res) => {
  const { _id, email, firstName } = user;

  const token = _id + uuidv4();
  const link = process.env.URL + "users/verify/" + _id + "/" + token;

  console.log(link);

  let mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "Email Verification",
    html: `<p>Hello ${firstName},</p>
        <p>Welcome to Our App! Please click the following link to verify your email:</p>
        <a href="${link}">${link}</a>
        <p>If you did not request this verification, you can ignore this email.</p>`,
  };

  try {
    const hashedToken = await hashString(token);

    const newVerifiedEmail = await Verification.create({
      userId: _id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000,
    });

    if (newVerifiedEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "Pending",
            message: "verification email has been sent to your account",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({
            success: "false",
            message: "something went wrong while sending verification email",
            link,
          });
        });
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Error sending verification email" });
  }
};

const resetPasswordLink = async (user, res) => {
  const { _id, email } = user;
  const token = _id + uuidv4();
  const link = process.env.URL + "users/reset-password/" + _id + "/" + token;

  console.log(link);

  const mailOptions = {
    from: process.env.AUTH_EMAIL,
    to: email,
    subject: "password reset",
    html: `<a href='${link}'><button>Verify Email</button></a>`,
  };

  try {
    const hashedToken = await hashString(token);
    const resetEmail = await PasswordReset.create({
      userId: _id,
      email: email,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    });

    if (resetEmail) {
      transporter
        .sendMail(mailOptions)
        .then(() => {
          res.status(201).send({
            success: "Pending",
            message: "reset password link has been sent to your account",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(404).json({ message: "Something went wrong" });
        });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "something went wrong" });
  }
};

export { sendVerificationEmail, resetPasswordLink };
