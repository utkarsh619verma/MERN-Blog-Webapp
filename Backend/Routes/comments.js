const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const Comment = require("../Models/Comment");
const bcrypt = require("bcrypt");

//CREATE COMMENT

router.post("/", async (req, res) => {
  try {
    const newcomment = new Comment(req.body);
    const savecomment = await newcomment.save();
    res.status(200).json(savecomment);
  } catch (error) {
    console.log(error);
  }
});

//UPDATE COMMENT

router.put("/:id", async (req, res) => {
  try {
    const updatedcomment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedcomment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE COMMENT

router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.send("comment deleted successfully");
  } catch (error) {
    res.send(error);
  }
});

//GET ALL POSTS

router.get("/post/:postId", async (req, res) => {
  try {
    const allcomments = await Comment.find({ postId: req.params.postId }); // returns all the documents in the collection, find({somevalue:"specifcvalue"}) returns those documents where somevalue property has the value specificvalue
    res.status(200).json(allcomments);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
