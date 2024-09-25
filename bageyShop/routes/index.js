const express = require("express");
const router = express.Router();
const { isloggedIn } = require("../middleware/isloggedIn");
const productModel = require("../models/productModel");

router.use((req, res, next) => {
  res.locals.loggedIn = req.cookies.token ? true : false;
  next();
});

router.get("/", (req, res) => {
  let error = req.flash("error");
  let acc = req.flash("Acc");
  res.render("index", { error, acc });
});

router.get("/dashboard", isloggedIn, async (req, res) => {
  let products = await productModel.find();
  res.render("shop", { products });
});

module.exports = router;
