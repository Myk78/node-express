var express = require("express");
var router = express.Router();

var { registeruser, loginUser, logout } = require("../controller/Oauth");
const { isloggedIn } = require("../middleware/isloggedIn");

const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", registeruser);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/account", isloggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let success = req.flash("success");
  let error = req.flash("error");
  res.render("userprofile", { success, user, error });
});
router.post("/account/updateInfo", isloggedIn, async (req, res) => {
  console.log("Received POST request for /account/updateInfo");
  console.log(req.body);

  try {
    let { fullname, email } = req.body; // Ensure these names match your input names
    let user = await userModel.findOneAndUpdate(
      { email: req.user.email },
      { fullname, email },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    req.flash("success", "Your Info is Updated");
    res.redirect("/users/account");
  } catch (err) {
    console.error(err); // Log any error for debugging
    req.flash("error", "Failed to update info");
    res.redirect("/users/account");
  }
});

router.post("/account/updatepassword", async (req, res) => {
  let { currentPassword, newpassword } = req.body;
  let userpass = await userModel.findOne({ email: req.user.email });
  bcrypt.compare(currentPassword, user.password, function (err, result) {
    if (!result) {
      req.flash("error", "Password is incorrect");
      return res.status(401).redirect("/account");
    }
    // Hash the new password
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(newpassword, salt, async function (err, hash) {
        if (err) {
          req.flash("error", "something is wrong");
          return res.status(500).redirect("/account");
        }

        // Save new password
        userpass.password = hash;
        await userpass.save();
        req.flash("succes", "your password is change");
        res.redirect("/account");
      });
    });
  });
});

module.exports = router;
