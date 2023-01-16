//controllers
const registeruser = async (req, res, next) => {
  if (!req.body.email) {
    res.status(404);
    return next(new Error("Email is required"));
  }
  res.send("User registration route");
};

// exporting controllers
module.exports = {
  registeruser,
};
