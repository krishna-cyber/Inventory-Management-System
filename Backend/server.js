//configuring dotenv
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const router = require("./routes/routes");
const userRouter = require("./routes/user.route");
const ErrorHandler = require("./middleware/errorHandler");

//creating app instance
const app = express();

//configuring express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(helmet());

//configuring routes
app.use("/", router);
app.use("/api/user", userRouter);

//error handler middleware
app.use(ErrorHandler);

//connection with database and server start
mongoose.connect(process.env.MONGO_URI).then((conn) => {
  console.log(`Database connected at instance ${conn.connection.host}`);
  app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`);
  });
});
