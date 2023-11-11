const express = require("express");
const router = express.Router();
const User = require("../Models/User");
const Post = require("../Models/Post");
const Comment = require("../Models/Comment");
const bcrypt = require("bcrypt");
const verifytoken = require("../verifytoken");

//CREATE POST

router.post("/create", verifytoken, async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.status(200).json(savePost);
  } catch (error) {
    console.log(error);
  }
});

//UPDATE POST

router.put("/:id", verifytoken, async (req, res) => {
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

//DELETE POST

router.delete("/delete/:id", verifytoken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comment.deleteMany({ postId: req.params.id });
    console.log("Deleting");
    res.send("Post deleted successfully");
  } catch (error) {
    res.send(error);
  }
});

//GET POST DETAILS

router.get("/:id", async (req, res) => {
  //The name of the parameter in the route pattern (:something in this case) is used as the key in req.params,
  //so you can access it using that key in your route handler.
  //However, it's important to make sure your route parameter name matches the field you intend to query in your database, or adjust your query accordingly.
  try {
    const data = await Post.findById(req.params.id); //this id here will match the id in the collection which has been provided by the database itself and not created seperately as a parameter
    console.log("ad ");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
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
        : { title: { $regex: query.search, $options: "i" } };
    console.log(filter);
    const result = await Post.find(filter);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
