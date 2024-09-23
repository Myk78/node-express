var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var cookieparser = require("cookie-parser");
const { generateToken } = require("../utils/generateToken");

var userModel = require("../models/userModel");

module.exports.registeruser = async function (req, res, next) {
  try {
    let { fullname, email, password } = req.body;

    let alreadyRegister = await userModel.find({ email });
    if (email) return res.status(401).send("This email is already register");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let createdUser = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(createdUser);
          res.cookie("token", token);
          res.send("user created successfully");
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
};
