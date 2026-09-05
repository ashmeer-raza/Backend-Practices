import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";
import dotenv from "dotenv";

dotenv.config();

export const authnticate = async (req, res, next) => {
  const token = req.header.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Token Not Found",
    });
  }
  // const data = jwt.decode(token); //Decode the token to get the user ID.
  const data = jwt.verify(token, process.env.JWT_SECRET); //verify the token using jwt.verify() in a real application for security.
  const user = await userModel.findById(data.id);

  req.user = user;
};
