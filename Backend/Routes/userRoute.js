const express = require("express");

//importing controllers
const { registeruser } = require("../Controllers/userController");

//creating router object
const router = express.Router();

//creating routes
router.post("/register", registeruser); //register user

//exporting routes
module.exports = router; // exporting router object
