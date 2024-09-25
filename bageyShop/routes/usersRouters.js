var express = require("express");
var router = express.Router();

var { registeruser, loginUser, logout } = require("../controller/Oauth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", registeruser);
router.post("/login", loginUser);
router.get("/logout", logout);

module.exports = router;
