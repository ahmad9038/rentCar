import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const hashString = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedString = await bcrypt.hash(password, salt);
  return hashedString;
};

export const compareString = async (typedPassword, originalPassword) => {
  const isMatch = await bcrypt.compare(typedPassword, originalPassword);
  return isMatch;
};

export function createJWT(id) {
  return jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
}
