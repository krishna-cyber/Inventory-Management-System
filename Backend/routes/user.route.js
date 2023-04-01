const router = require("express").Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

module.exports = router;
