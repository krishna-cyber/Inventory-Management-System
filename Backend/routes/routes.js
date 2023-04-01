const router = require("express").Router();

//creating routes
router.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = router;
