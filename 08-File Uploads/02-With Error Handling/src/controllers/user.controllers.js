const express = require("express");
const router = express.Router();

const User = require("../models/user.models");

//middleware for file upload
const {
  single,
  multipleAraay,
  multipleAny,
} = require("../middlewares/uploads");

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.status(200).send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//we cannot directly put middleware so we have to use uploads.single or uploads.any or any other method provided by multe and pass the field that we have puted in userSchema
//you can use all the uploads method in one route also(i created separate route for better understanding)

//.single-for uploading single file
router.post("", single("profilePic"), async (req, res) => {
  try {
    const user = await User.create(
      //we have to specified our field explicitely because we cannot have req.file we only have req.body
      {
        firstName: req.body.firstName,
        profilePic: req.file.path,
      }
    );

    console.log("req.body", req.body);
    console.log("req.file", req.file);

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//.array-for uploading multiple files with another argument which limits the number of file uploads
router.post("/array", multipleAraay("profilePic", 3), async (req, res) => {
  try {
    //looping over multiple file to get individual file path
    const filePaths = req.files.map((file) => file.path);

    const user = await User.create({
      firstName: req.body.firstName,
      profilePic: filePaths,
    });

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//.any-for uploading multiple files with no limit
router.post("/any", multipleAny("profilePic"), async (req, res) => {
  try {
    const filePaths = req.files.map((file) => file.path);

    const user = await User.create({
      firstName: req.body.firstName,
      profilePic: filePaths,
    });

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
