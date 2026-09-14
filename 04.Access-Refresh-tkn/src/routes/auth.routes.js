import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/auth.js";

const router = Router();

// @post /api/auth/register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({
      message: "User already exists",
      error: [
        {
          path: "email",
          message: "User already exists",
        },
      ],
    });
  }

  const user = userModel.create({
    name,
    email,
    passwordHash: await bcrypt.hash(password, 10),
  });

  const { accessToken, refreshToken } = generateToken({ userId: user._id });

  user.refreshToken = refreshToken; //Refresh Token Stored in Cookies and Access Token in Redux/Context Api
  await user.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(201).json({
    message: "user registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
      },
    },
    accessToken,
  });
});

export default router;
