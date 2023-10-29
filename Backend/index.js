const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/posts");
const commentRoute = require("./Routes/comments");
const cookieParser = require("cookie-parser");

dotenv.config();

app.use(express.json()); //middleware function working for all routes
app.use(cookieParser()); //cookie-parser is used to parse cookies from incoming HTTP requests, making them accessible via req.cookies.
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

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
