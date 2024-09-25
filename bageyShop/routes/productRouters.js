const express = require("express");
const router = express.Router();

const upload = require("../config/multer-config");

const productModel = require("../models/productModel");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    let createproduct = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("success", "You add Product Successfully");
    return res.redirect("/owner/panel");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
