const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    age: { type: Number, required: true },
  },

  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
