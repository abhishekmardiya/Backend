const express = require("express");
const router = express.Router();

//express validator's import code
const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

router.post(
  "",
  //middleware for firstName
  body("firstName").not().isEmpty().withMessage("First Name cannot be empty"),
  //middleware for email
  body("email")
    .isEmail()
    .isLength({ min: 5 })
    //custom validation for email
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),
  //middleware for age
  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be in number")
    //custom validation for age
    .custom((value) => {
      if (value < 1 || value > 120) {
        throw new Error("Age must be in between 1 to 120");
      }
      return true;
    }),
  //middleware for password
  body("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password cannot be empty")
    //custom validation for password
    .custom((value) => {
      const pass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

      if (!value.match(pass)) {
        throw new Error("Password must be strong");
      }
      return true;
    })
    //custom validation for confirmPassword
    .custom((value, { req }) => {
      if (value !== req.body.confirmPassword) {
        throw new Error("Password and confirm password must be match");
      }
      return true;
    }),
  async (req, res) => {
    try {
      //this console will show all the middleware present in the express validator package
      // console.log(body());

      //express validator's validation code
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.create(req.body);
      return res.status(201).send({ user: user });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
);

module.exports = router;