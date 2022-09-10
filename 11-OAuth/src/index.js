const express = require("express");
const connect = require("./configs/db");
const app = express();

//code from oauth package
const passport = require("./configs/google-oauth");

app.get(
  "/auth/google",
  passport.authenticate(
    "google",
    //add anything you want interested in
    { scope: ["profile", "email"] }
  )
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    return res.status(200).send({ user: req.user });
  }
);

app.listen(5000, async () => {
  try {
    await connect();
    console.log("listening on port 5000");
  } catch (err) {
    console.log(err.message);
  }
});
