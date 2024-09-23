const mongoose = require("mongoose");
const config = require("config");
const dbugr = require("debug")("development:mongoose");
mongoose
  .connect(`${config.get("MONGODB_URI")}/bhagyshop`)
  .then(function () {
    console.log("connected");
  })
  .catch(function (err) {
    dbugr(err);
  });
module.exports = mongoose.connection;
