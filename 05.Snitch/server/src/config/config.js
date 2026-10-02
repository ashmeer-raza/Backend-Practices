import dotenv from "dotenv";
dotenv.config();

const config = {
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/snitch",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
  IMAGEJIT_PRIVATE_KEY: process.env.IMAGEJIT_PRIVATE_KEY,
};

export default config;
