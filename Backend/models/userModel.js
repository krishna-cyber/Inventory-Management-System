const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "Email already exists"],
      lowercase: true,
      trim: true,
      match: [
        /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minLength: [6, "Minimum password length is 6 characters"],
      maxLength: [12, "Maximum password length is 12 characters"],
    },
    photo: {
      type: String,
      required: [true, "Please provide a photo"],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    bio: {
      type: String,
      maxLength: [200, "Maximum bio length is 200 characters"],
      default: "simple bio",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
