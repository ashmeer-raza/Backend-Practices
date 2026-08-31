const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb_uri);
    console.log("Db Connected");
  } catch (error) {
    console.log("Error while conneting DB", error);
  }
};

module.exports = connectDB;
