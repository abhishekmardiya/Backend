const express = require("express");
const router = express.Router();

const Comment = require("../models/comment.model");

//read
router.get("", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate({
        path: "postId",
        select: ["title"],
        populate: { path: "userId", select: ["firstName"] },
      })
      .populate({
        path: "userId",
        select: ["firstName"],
      })
      .lean()
      .exec();

    return res.status(200).send({ comments: comments });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
//getting a single post
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
      .populate({
        path: "postId",
        select: ["title"],
        populate: { path: "userId", select: ["firstName"] },
      })
      .populate({
        path: "userId",
        select: ["firstName"],
      })
      .lean()
      .exec();

    return res.status(200).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post
router.post("", async (req, res) => {
  try {
    //singular
    const comment = await Comment.create(req.body).lean().exec();

    return res.status(201).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//update
router.patch("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate({
        path: "postId",
        select: ["title"],
        populate: { path: "userId", select: ["firstName"] },
      })
      .populate({
        path: "userId",
        select: ["firstName"],
      })
      .lean()
      .exec();

    return res.status(201).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id)
      .lean()
      .exec();

    return res.status(201).send({ comment: comment });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
