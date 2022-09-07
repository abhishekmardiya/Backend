const express = require("express");
const router = express.Router();

//post needs both models
const Post = require("../models/post.models");
const Comment = require("../models/comment.model");

//read
router.get("", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(200).send({ posts: posts });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
//getting a single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(200).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post
router.post("", async (req, res) => {
  try {
    //singular
    const post = await Post.create(req.body).lean().exec();

    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//update
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
      .populate({ path: "userId", select: ["firstName"] })
      .lean()
      .exec();

    return res.status(201).send({ post: post });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId })
      .lean()
      .exec();
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
module.exports = router;
