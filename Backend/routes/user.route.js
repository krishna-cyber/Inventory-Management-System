const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  profile,
  onlineStatus,
  updateuser,
  changePassword,
  forgotPassword,
} = require("../controllers/userController");

const authProtect = require("../middleware/authMiddleware");

//user registration route
router.post("/register", registerUser);

//user login route
router.post("/login", loginUser);

//logout route for user
router.get("/logout", logoutUser);

//getting profile for patricular user
router.get("/profile", authProtect, profile);

//update user profile
router.patch("/profile", authProtect, updateuser);

//change password
router.patch("/changePassword", authProtect, changePassword);

//get online status
router.get("/onlineStatus", onlineStatus);

//forgot password
router.post("/forgotPassword", forgotPassword);
module.exports = router;
