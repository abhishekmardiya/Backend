const express = require("express");
//importing only Router from express beacuse we are not gonna use whole express here
const router = express.Router();

//importing User model from models
const User = require("../models/user.models");

//read
//you can replace / or "" with removed route
//before: "/users"
//after: ""

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send({ users: users });
  } catch (err) {
    return res.status(500).send({ message: "Something went wrong" });
  }
});
//getting a single user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.status(200).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//post
router.post("", async (req, res) => {
  try {
    const user = await User.create(req.body).lean().exec();

    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//update
router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//delete
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(201).send({ user: user });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//for index.js
module.exports = router;
