var express = require("express");
var router = express.Router();

var { registeruser } = require("../controller/Oauth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", registeruser);

module.exports = router;
