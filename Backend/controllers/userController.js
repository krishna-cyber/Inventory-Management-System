const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");

const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, photo, phone, bio } = req.body;
  //throw error with status code and message

  throw {
    statusCode: 400,
    message: "Email already exists",
  };
});

const loginUser = async (req, res) => {};

const logoutUser = async (req, res) => {};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
