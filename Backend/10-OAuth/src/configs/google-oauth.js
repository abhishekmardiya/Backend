require("dotenv").config();
const User = require("../models/user.model");

//code from package
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      //add url
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      //this console will give us email from google oauth (profile object has everything related to user)
      // console.log(profile._json.email);
      //stroing user email in our database+
      let user = await User.findOne({ email: profile?._json.email })
        .lean()
        .exec();
      if (!user) {
        user = await User.create({
          email: profile._json.email,
        });
      }
      console.log(user);
      return cb(null, user);
    }
  )
);

module.exports = passport;
