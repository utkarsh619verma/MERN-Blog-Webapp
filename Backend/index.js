const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected ");
  } catch (err) {
    console.log(err.message);
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server listening at port " + process.env.PORT);
});
