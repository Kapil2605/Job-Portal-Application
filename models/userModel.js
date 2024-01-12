const mongoose = require("mongoose");
const validator = require("validator");
//schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name Is Required"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, " Email is Required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Password length should be greater than 6 character"],
      select: true,
    },
    location: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("users", userSchema);
