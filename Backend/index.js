const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/posts");
const commentRoute = require("./Routes/comments");
const cookieParser = require("cookie-parser");
const CORS = require("cors");
const multer = require("multer");

dotenv.config();

app.use(express.json()); //middleware function working for all routes
app.use(cookieParser()); //cookie-parser is used to parse cookies from incoming HTTP requests, making them accessible via req.cookies.
app.use(CORS({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);
app.use("/api/comment", commentRoute);

//IMAGE UPLOAD
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "Images");
  },
  filename: (req, res, cb) => {
    cb(null, req.body.img);
  },
});

const upload = multer({ storage: storage }); // an instance of multer middleware
app.post("/api/upload", upload.single("file"), (req, res) => {
  //handling a single file upload
  res.status(200).json("Image uploaded successfully!");
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected ");
  } catch (err) {
    console.log(err);
  }
};

app.listen(process.env.PORT, () => {
  connectDB();
  console.log("server listening at port " + process.env.PORT);
});
