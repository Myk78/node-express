var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieparser = require("cookie-parser");
const { generateToken } = require("../utils/generateToken");

var userModel = require("../models/userModel");

module.exports.registeruser = async function (req, res, next) {
  try {
    let { fullname, email, password } = req.body;

    let alreadyRegister = await userModel.findOne({ email });
    if (alreadyRegister) {
      req.flash("error", "This email is already register");
      return res.status(401).redirect("/");
    }

    bcrypt.genSalt(10, function (err, salt) {
      if (err) return res.status(500).send(err.message);
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).send(err.message);
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          req.flash("Acc", "Your acc is Created");
          return res.status(201).redirect("/");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports.loginUser = async function (req, res, next) {
  let { email, password } = req.body;

  let loginUser = await userModel.findOne({ email });
  if (!loginUser) {
    req.flash("error", "email and password is wrong");
    return res.redirect("/");
  }

  bcrypt.compare(password, loginUser.password, function (err, result) {
    try {
      if (!result) {
        req.flash("error", "email and password is wrong");
        return res.status(401).redirect("/");
      } else {
        let token = generateToken(loginUser);
        res.cookie("token", token);
        return res.status(200).redirect("/dashboard");
      }
    } catch (err) {
      return res.status(500).send("Server error: " + err.message);
    }
  });
};

module.exports.logout = function (req, res, next) {
  res.cookie("token", "");
  res.redirect("/");
};
