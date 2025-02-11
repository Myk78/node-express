var express = require("express");
const { createUser } = require("../controller/Crud");
var router = express.Router();

/* GET home page. */
// router.get("/", createUser);
router.get("/", async (req, res, next) => {
  res.send("Hello");
});
module.exports = router;
