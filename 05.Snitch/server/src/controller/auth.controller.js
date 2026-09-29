import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";

export async function register(req, res) {
  try {
    const { name, email, password } = req.body;

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
      name: name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    await userModel.findByIdAndUpdate(user._id, { refreshToken });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
        errors: {
          field: "email",
          message: "Email not found",
        },
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid email or password",
        errors: {
          field: "password",
          message: "Incorrect password",
        },
      });
    }

    const accessToken = createAccessToken({
      userId: user._id,
      role: user.role,
    });
    const refreshToken = createRefreshToken({
      userId: user._id,
      role: user.role,
    });

    await userModel.findOneAndUpdate({ email }, { refreshToken });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function refresh(req, res) {
  // Get the refresh token from the cookies
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    //verify the refresh token are valid or not
    try {
      // If the refresh token is valid, decode it to get the user ID and role
      const decoded = readRefreshToken(refreshToken);

      const { userId, role } = decoded;

      const user = await userModel.findById(userId);

      // check in the database if the refresh token is valid
      if (!user || !user.refreshToken) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }

      // check the prevoius refresh token is same as the new refresh token or not
      if (refreshToken !== user.refreshToken) {
        await userModel.findByIdAndUpdate(userId, {
          refreshToken: null,
        });
        return res.status(401).json({ message: "Mismatched refresh token" });
      }

      const newAccessToken = createAccessToken({ userId, role });
      const newRefreshToken = createRefreshToken({ userId, role });

      await userModel.findByIdAndUpdate(userId, {
        refreshToken: newRefreshToken,
      });

      res.cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
      });

      res.status(200).json({
        message: "Tokens refreshed successfully",
        data: {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
          },
          accessToken: newAccessToken,
        },
      });
    } catch (error) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getMe(req, res) {
  try {
    const { userId, role } = req.user;
    const user = await userModel.findById(userId);
    res.status(200).json({
      message: "User fetched successfully",
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
