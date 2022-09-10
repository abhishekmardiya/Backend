const express = require("express");
//importing only Router from express beacuse we are not gonna use whole express here
const router = express.Router();

//importing User model from models
const User = require("../models/user.models");

//import crud contoller
const crudControllers = require("./crud.controllers");

//*****************CRUD**************** */

//read
router.get("", crudControllers.get(User));
//getting a single user
router.get("", crudControllers.get(User));

//post
router.post("", crudControllers.post(User));

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
