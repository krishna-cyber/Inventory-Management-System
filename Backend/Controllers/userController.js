//importing async handler
const asyncHandler = require("express-async-handler");
//importing user model
const User = require("../Models/userSchema");
//controllers
const registeruser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  //validation
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }

  //check the length of the password
  if (password.length < 6) {
    res.status(400);
    throw new Error("Password must be at least 6 characters long");
  }
  //check if the user already exists
  const user = await User.findOne({ email });
  if (user) {
    res.status(400);
    throw new Error("User already exists");
  }
  //create new user
  const newUser = await User.create({
    name,
    email,
    password,
  });
  //send response
  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      photo: newUser.photo,
      phone: newUser.phone,
      bio: newUser.bio,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});
// exporting controllers
module.exports = {
  registeruser,
};
