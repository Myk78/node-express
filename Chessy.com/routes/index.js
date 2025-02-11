var express = require("express");
var router = express.Router();
var socket = require("socket.io");
var { Chess } = require("chess.js");
var http = require("http");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
