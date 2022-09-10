const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//hook from mongoose.this is an middleware
//this middleware run before user is created or updated
//don't use arrow function because "this" does not work in arrow funcion
userSchema.pre("save", function (next) {
  //second argument is hashing round
  const hash = bcrypt.hashSync(this.password, 8);
  this.password = hash;

  return next();
});

//custom method for checking password exists or not with our database
//checkPassword is our custom method
userSchema.methods.checkPassword = function (password) {
  //password-plain text password
  //this.password-hash password
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
