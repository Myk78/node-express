const express = require("express");
const router = express.Router();
const { isloggedIn } = require("../middleware/isloggedIn");
const productModel = require("../models/productModel");
const userModel = require("../models/userModel");

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
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isloggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");
  res.render("cart", { user});
});

router.get("/cart/:productid", isloggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email });
    if (!user) return res.status(404).send("User not found");

    if (!user.cart) {
      user.cart = []; // Initialize cart if it doesn't exist
    }
    user.cart.push(req.params.productid);
    await user.save();

    req.flash("success", "You added a product to the cart");
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred");
  }
});

module.exports = router;
