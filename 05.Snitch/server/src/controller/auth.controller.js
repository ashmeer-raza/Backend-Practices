import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken, createRefreshToken } from "../utils/auth.utils.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({
        message: "User already exists",
        errors: {
          field: "Email is already registered",
          message: "Please use a different email address",
        },
      });
    }

    const user = await userModel.create({
      username,
      email,
      passwordHash: await bcrypt.hash(password, 10),
    });

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
