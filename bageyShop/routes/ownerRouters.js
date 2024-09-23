const express = require("express");
const router = express.Router();

const ownerModel = require("../models/adminModel");
router.get("/", (req, res) => {
  res.send("hey it's working");
});
process.env.NODE_ENV = "development";
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    let owner = await ownerModel.find();
    if (owner.length > 0) {
      return res.status(503).send("The owner is already registered");
    }

    let { fullname, email, password } = req.body;
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.status(201).send(createdOwner);
  });
}

module.exports = router;
