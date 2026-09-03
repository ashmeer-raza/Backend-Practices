import jwt from "jsonwebtoken";
import userModel from "../model/user.model.js";

export const authnticate = async (req, res, next) => {
  const token = req.header.authorization;
  if (!token) {
    return res.status(401).json({
      message: "Token Not Found",
    });
  }
  const data = jwt.decode(token);
  const user = await userModel.findById(data.id);

  req.user = user;
};
