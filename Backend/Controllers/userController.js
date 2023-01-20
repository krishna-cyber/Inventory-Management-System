//importing async handler
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken"); // import the Library.

//importing user model
const User = require("../Models/userSchema");

//generating token function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: "1d",
  });
};
//controllers
//user registration controller
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone } = req.body;
  console.log(req.body);

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
    phone,
  });
  //Generating token
  const token = generateToken(newUser._id); //Token will expire in 1 day and generated for the newUser._id
  //set cookie
  res.cookie("token", token, {
    path: "/",
    httpOnly: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //cookie will expire in 1 day
    sameSite: "none", //for secure cookie
    secure: true, //for secure cookie
  });

  //send response
  if (newUser) {
    const { _id, name, email, password, photo, phone, bio } = newUser;
    res.status(201).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//user login controller
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //validation
  if (!email || !password) {
    res.status(400);
    throw new Error("Please fill all required fields");
  }
  //check if the user exists
  const user = await User.findOne({
    email,
  });
  if (!user) {
    res.status(400);
    throw new Error("User does not exist! Please Sign up first💖");
  }
  //check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  //sending response to client after password correct and user found
  if (isPasswordCorrect && user) {
    const { _id, name, email, photo, phone, bio } = user;

    //generate token for the user
    const token = generateToken(_id); //Token will expire in 1 day and generated for the user._id
    //set cookie
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), //cookie will expire in 1 day
      sameSite: "none", //for different sites
      secure: true, //for secure cookie
    });

    //send response
    res.status(200).json({
      _id,
      name,
      email,
      photo,
      phone,
      bio,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password!!");
  }
});
// exporting controllers
module.exports = {
  registerUser,
  loginUser,
};
