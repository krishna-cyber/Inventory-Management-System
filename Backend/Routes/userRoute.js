const express = require("express");

//importing controllers
const { registeruser } = require("../Controllers/userController");

const router = express.Router();

//creating routes
router.post("/register", registeruser);

//exporting routes
module.exports = router;
