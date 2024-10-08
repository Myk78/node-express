const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports.isloggedIn = async function (req, res, next) {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    return res.redirect("/");
  }

  try {
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decode.email })
      .select("-password");
    req.user = user;
    if (user) {
      req.user = user;
      // Set loggedIn to true for the EJS template to use
      res.locals.loggedIn = true;
    } else {
      res.locals.loggedIn = false;
    }
    next();
  } catch (err) {
    req.flash("error", "Your not authenticate");
    res.redirect("/");
  }
};
