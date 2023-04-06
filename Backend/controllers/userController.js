const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

//jwt token generation
function generateToken({ name, _id }) {
  return jwt.sign(
    {
      name,
      _id,
    },
    process.env.SECRET,
    { expiresIn: "1d" } // 1 day
  );
}

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
      //token generation
      const token = generateToken({ name, _id });
      console.log(token);

      //sending token in cookie
      res.cookie("token", token, {
        expires: new Date(Date.now() + 1800000), //30 minutess
        httpOnly: true,
        path: "/",
        sameSite: "none",
        secure: true,
      });

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

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  //validation for empty fields at server side
  if (!email || !password) {
    throw {
      statusCode: 400,
      message: "Please fill all the fields",
    };
  }

  //checking the user exist or not
  var user = await User.findOne({ email });

  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }

  //if user exist then check for password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).send(`Invalid Credentials`);
  }

  //generate jwt token
  const token = generateToken({ name: user.name, _id: user._id });

  //sending token in cookie
  res.cookie("token", token, {
    expires: new Date(Date.now() + 1800000), //30 minutess
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged in successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    bio: user.bio,
    photo: user.photo,
  });
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
});

//getting profile for patricular user
const profile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }
  res.send(user);
});

//get online status
const onlineStatus = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(200).json({
      success: false,
      message: "User not logged in",
    });
  }

  const decoded = jwt.verify(token, process.env.SECRET);

  if (decoded) {
    res.status(200).json({
      success: true,
      message: "User logged in",
    });

    res.json(false);
  }
});

//update user profile
const updateuser = asyncHandler(async (req, res, next) => {
  //getting user data
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }

  //update user dynamically only that field user want to update

  //updating user data
  if (user) {
    user.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          name: req.body.name || user.name,
          email: req.body.email || user.email,
          photo: req.body.photo || user.photo,
          phone: req.body.phone || user.phone,
          bio: req.body.bio || user.bio,
        },
      },
      { new: true, runValidators: true }
    );
  }
});

//change password controller
const changePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw {
      statusCode: 400,
      message: "User not found",
    };
  }

  //validation for empty fields at server side
  if (!req.body.oldPassword || !req.body.newPassword) {
    throw {
      statusCode: 400,
      message: "Please fill all the fields",
    };
  }

  //checking password length
  if (req.body.newPassword.length < 6) {
    throw {
      statusCode: 400,
      message: "Password must be atleast 6 characters long",
    };
  }

  //checking old password
  const isMatch = await user.comparePassword(req.body.oldPassword);
  if (!isMatch) {
    throw {
      statusCode: 400,
      message: "Old password is incorrect",
    };
  }

  //updating password
  user.password = req.body.newPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});

//forgot password controller
const forgotPassword = asyncHandler(async (req, res, next) => {
  res.send("forgot password");
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  onlineStatus,
  updateuser,
  changePassword,
  forgotPassword,
};
