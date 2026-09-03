import express from "express";
import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import { authnticate } from "../middleware/auth.middleware.js";

const app = express();
app.use(express.json());

app.post("/auth/register", async (req, res) => {
  try {
    let { email, name, password } = req.body;

    const user = await userModel.create({
      email,
      name,
      password,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      "de39d3261f006dcfd6e1c00938c112eb3a6a7507f9be99e2fce25ca1647dfe84",
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
