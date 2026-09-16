import mongoose from "mongoose";
import config from "./config.js";

async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Mongodb Connected");
  } catch (error) {
    console.log("error : ", error.message);
  }
}

export default connectDB;
