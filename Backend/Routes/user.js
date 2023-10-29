const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const Comment = require("../Models/Comment");
const bcrypt = require("bcrypt");
const verifyToken = require("../verifytoken");

//UPDATE USER

router.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const updated_user = await User.findByIdAndUpdate(
        req.params.id,
        { $seet: req.body },
        { new: true }
      );
      res.status(200).json(updated_user);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE USER

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.send("User deleted successfully");
  } catch (error) {
    res.send(error);
  }
});

//GET USER

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc; // {password:othername} password would get renamed as othername
    res.status(200).json(info);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
