import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    //seller ,user
    type: String,
    default: "user",
    enum: ["user", "seller"], //enum is used to restrict the values of the role field to either "user" or "seller"
  },
  refreshToken: {
    type: String,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
