const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newsalt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, newsalt); //hashSync is synchronous while hash is asynchronous
    const newUser = new User({ username, email, password: hashedPassword }); // creating new document newUser with the help of imported model User
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).json("Email not found!");
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(500).json("Invalid Password!");
    }
    const jwt_token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "3d",
    });
    const { password, ...info } = user._doc; //This code extracts the password property from the user object and stores it in a variable called password.
    //The rest of the user information is stored in an object called info. The ... syntax is used for object destructuring to collect all other properties in the user object except password.
    res.cookie("jwtToken", jwt_token).status(200).json(info);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGOUT

router.post("/logout", (req, res) => {
  try {
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true }) //when samesite is none the cookie can be sent in all requests (both same and cross site) and in this case
      //for security purposes we set secure to true meaning the connection and requests can be made only over https connections
      .status(200)
      .send("Logged out Successfully!");
  } catch (error) {
    res.send(500).json(error);
  }
});

//REFETCH USER

router.get("/refetch", (req, res) => {
  const token = req.cookies.jwt_token;
  jwt.verify(token, process.env.SECRET_KEY, {}, async (err, data) => {
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).json(data);
  });
});

module.exports = router;
