const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").config();

//function for returning a generated token
const generatedToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    //if user is already exits
    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }
    //if user is new then we will allow to create one
    else {
      user = await User.create(req.body);

      //for generating a token
      const token = generatedToken(user);

      return res.status(200).send({ user, token });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    //***********checking email*************
    //if user is not exits
    if (!user) {
      return res
        .status(400)
        .send({ message: "wrong email , please register first" });
    }
    //*********checking password***********************
    //if email is exists then we check for password
    else {
      //req.body.password is plain text password
      //we are sending plain text password for checking the password to our custom method
      //if passsword is present then match has true value otherwise false value
      const match = user.checkPassword(req.body.password);

      //if it not match then match variable has false boolean value
      if (!match) {
        return res.status(400).send({ message: "wrong password" });
      }
      //if its match then match variable has true boolean value
      else {
        //for generating a token
        const token = generatedToken(user);

        return res.status(200).send({ user, token });
      }
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = { register, login };
