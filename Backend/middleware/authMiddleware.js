const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authProtect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;
  if (!token) {
    throw {
      statusCode: 401,
      message: "Not authorized, Session expired",
    };
  }

  //verify token
  const decoded = jwt.verify(token, process.env.SECRET);

  const user = await User.findById(decoded._id).select("-password");

  if (!user) {
    throw {
      statusCode: 401,
      message: "User not found",
    };
  }

  req.user = user;
  next();
});

module.exports = authProtect;
