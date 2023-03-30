//configuring dotenv
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

//creating app instance
const app = express();

//connection with database and server start

mongoose.connect(process.env.MONGO_URI).then((conn) => {
  console.log(`Database connected at instance ${conn.connection.host}`);
  app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
  });
});
