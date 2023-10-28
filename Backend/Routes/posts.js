const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const Comment = require("../Models/Comment");
const bcrypt = require("bcrypt");

//CREATE POST

router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    console.log(error);
  }
});

//UPDATE POST

router.put("/:id", async (req, res) => {
  try {
    const updatedpost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedpost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE USER

router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.send("Post deleted successfully");
  } catch (error) {
    res.send(error);
  }
});

//GET USER POSTS

router.get("/user/:userId", async (req, res) => {
  try {
    const allposts = await Post.find({ userId: req.params.userId }); // returns all the documents in the collection, find({somevalue:"specifcvalue"}) returns those documents where somevalue property has the value specificvalue
    res.status(200).json(allposts);
  } catch (error) {
    console.log(error);
  }
});

//GET ALL POSTS

router.get("/", async (req, res) => {
  try {
    const query = req.query;
    const filter =
      Object.keys(query).length === 0
        ? {}
        : { username: { $regex: query.username, $options: "i" } };
    console.log(filter);
    const result = await Post.find(filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
