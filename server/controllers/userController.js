import VerificationToken from "../models/emailVerification.js";
import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";
import {
  resetPasswordLink,
  sendVerificationEmail,
} from "../utils/sendEmail.js";
import PasswordReset from "../models/passwordReset.js";

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      // next("Email already exists");
      return res
        .status(422)
        .json({ status: false, message: "Email already exists" });
    }

    const hashedPassword = await hashString(password);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    sendVerificationEmail(user, res);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .json({ status: false, message: "Server Error, Please Try Again" });
  }
};

const verifyEmail = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const result = await VerificationToken.findOne({ userId });

    if (result) {
      const { expiresAt, token: hashedToken } = result;

      if (expiresAt < Date.now()) {
        VerificationToken.findOneAndDelete({ userId })
          .then(() => {
            Users.findOneAndDelete({ _id: userId })
              .then(() => {
                const message = "verification Token has expired";
                res.redirect(`/users/verified?status=error&message=${message}`);
              })
              .catch((err) => {
                res.redirect("/users/verified?status=error&message=");
              });
          })
          .catch((error) => {
            console.log(error);
            res.redirect(`/users/verified?message=`);
          });
      } else {
        //token valid
        compareString(token, hashedToken)
          .then((isMatch) => {
            if (isMatch) {
              Users.findOneAndUpdate({ _id: userId }, { verified: true })
                .then(() => {
                  VerificationToken.findOneAndDelete({ userId }).then(() => {
                    const message = "email verified successfully";
                    res.redirect(
                      `/users/verified?status=success&message=${message}`
                    );
                  });
                })
                .catch((error) => {
                  console.log(error);
                  const message = "verification failed or link is invalid";
                  res.redirect(
                    `/users/verified?status=error&message=${message}`
                  );
                });
            } else {
              const message = "verification failed or liink is invalid";
              res.redirect(`/users/verified?status=error&message=${message}`);
            }
          })
          .catch((error) => {
            console.log(error);
            res.redirect(`/users/verified?message=`);
          });
      }
    } else {
      const message = "invalid verification. link. try again later";
      res.redirect(`/users/verified?status=error&message=${message}`);
    }
  } catch (error) {
    console.log(error);
    res.redirect(`/users/verified?message=`);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      return res
        .status(422)
        .json({ status: false, error: "Invalid credentials" });
    }

    if (!user?.verified) {
      return res
        .status(422)
        .json({ status: false, error: "Email not verified" });
    }

    const isMatch = await compareString(password, user?.password);

    if (!isMatch) {
      return res
        .status(422)
        .json({ status: false, error: "Invalid credentials" });
    }

    user.password = undefined;
    const token = createJWT(user?._id);
    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "" });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await Users.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: false, error: "Email not found" });
    }

    const existingRequest = await PasswordReset.findOne({ email });
    if (existingRequest) {
      if (existingRequest.expiresAt > Date.now()) {
        return res.status(201).json({
          status: "pending",
          message: "Reset password link has already sent to your email",
        });
      }

      await PasswordReset.findOneAndDelete({ email });
    }

    await resetPasswordLink(user, res);
  } catch (error) {}
};

const resetPassword = async (req, res) => {
  const { userId, token } = req.params;

  try {
    const user = await Users.findById(userId);

    if (!user) {
      const message = "invalid password reset link. try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
      return;
    }

    const resetPassword = await PasswordReset.findOne({ userId });
    if (!resetPassword) {
      const message = "invalid password reset link. try again";
      res.redirect(`/users/resetpassword?status=error&message=${message}`);
    }

    const { expiresAt, token: resetToken } = resetPassword;

    if (expiresAt < Date.now()) {
      const message = "reset password link is expired, try again";
      res.redirect(`/users/verified?status=error&message=${message}`);
    } else {
      const isMatch = await compareString(token, resetToken);

      if (!isMatch) {
        const message = "reset password link is expired, try again";
        res.redirect(`/users/verified?status=error&message=${message}`);
      } else {
        res.redirect(`/users/resetpassword?type=reset&id=${userId}`);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, password } = req.body;

    const hashedPassword = await hashString(password);

    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { password: hashedPassword }
    );

    if (user) {
      await PasswordReset.findOneAndDelete({ userId });
      const message = "password reset successfully";
      // res.redirect(`/users/resetpassword?status=success&message=${message}`);
      // res.redirect("http://localhost:3000/login");
      return res.status(201).json({
        status: true,
        message: message,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export {
  register,
  verifyEmail,
  login,
  requestPasswordReset,
  resetPassword,
  changePassword,
};
