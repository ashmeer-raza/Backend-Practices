import { Router } from "express";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import {
  generateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/auth.js";

const router = Router();

// @POST /api/auth/register
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

/**
 * @GET /api/auth/me
 */

router.get("/me", async (req, res) => {
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({
      message: "Access token is missing",
    });
  }

  try {
    const decoded = verifyAccessToken(accessToken);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      data: {
        user: {
          name: user.name,
          email: user.email,
        },
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid access token",
    });
  }
});

/**
 * @POST /api/auth/refresh
 */

router.post("/refresh", async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token is missing",
    });
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await userModel.findById(decoded.id);

    if (refreshToken !== user.refreshToken) {
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({
        message: "Invalid refresh token",
      });
    }

    const { accessToken, refreshToken: newRefreshToken } = generateToken({
      userId: user._id,
    });

    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      message: "Tokens refreshed successfully",
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid refresh token",
    });
  }
});

export default router;
