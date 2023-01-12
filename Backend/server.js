//importing modules and files
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

//creating server
const app = express(); //creating express app

//Middleware
app.use(cors()); //to allow cross origin resource sharing
app.use(bodyParser.json()); // for parsing application/json data come from frontend to backend
app.use(express.json()); //parse application/json
app.use(express.urlencoded({ extended: false })); //parse application/x-www-form-urlencoded

//providing port for server
const PORT = process.env.PORT || 5000;

//Routes
app.get("/", (req, res) => {
  res.send("Home Page");
});

//connect to database and start server
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to database 🪨`);
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT} 🚀`);
    });
  })
  .catch((err) => console.log(err));
