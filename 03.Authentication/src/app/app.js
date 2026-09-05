import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { authnticate } from "../middleware/auth.middleware.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/auth/register", async (req, res) => {
  try {
    let { email, name, password } = req.body;

    const user = await userModel.create({
      email,
      name,
      password: await bcrypt.hash(password, 10), // bcryptjs are used to put password secure.
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );
    res.status(201).json({
      message: "User Created",
      data: {
        email,
        password,
        id: user._id,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Api Runnig Fail",
    });
  }
});

app.get("/auth/register/me", authnticate, async (req, res) => {
  console.log(req.user);

  res.status(200).json({
    data: {
      user: req.user,
    },
  });
});

export default app;
