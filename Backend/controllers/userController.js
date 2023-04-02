const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, photo, phone, bio } = req.body;
  //validation for empty fields at server side
  if (!name || !email || !password) {
    throw {
      statusCode: 400,
      message: "Please fill all the fields",
    };
  }

  //checking for password length
  if (password.length < 6) {
    throw {
      statusCode: 400,
      message: "Password must be atleast 6 characters long",
    };
  }

  //checking already existing user
  const user = await User.findOne({ email });

  //only if user is not found
  if (user) {
    throw {
      statusCode: 400,
      message: "User already exists",
    };
  }
  //creating new user
  await User.create({
    name,
    email,
    password,
    photo,
    phone,
    bio,
  })
    .then((user) => {
      const { _id, name, email, bio } = user;
      res.status(201).json({
        success: true,
        message: "User created successfully",
        _id,
        name,
        email,
        bio,
      });
    })
    .catch((err) => {
      throw {
        statusCode: 500,
        message: err.message,
      };
    });
  kl;
});

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
