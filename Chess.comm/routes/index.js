const express = require("express");
const router = express.Router();
const { Chess } = require("chess.js");
const socket = require("socket.io");

router.get("/", (req, res) => {
  res.render("index", { Title: "Custom Chess Game" });
});

module.exports = router;
