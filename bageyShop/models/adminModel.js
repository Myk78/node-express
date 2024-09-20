const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    trim: true,
    minlength: 5,
  },
  email: String,
  password: String,
  products: {
    type: Array,
    default: [],
  },
  dstin: String,
  picture: String,
});

module.exports = mongoose.model("user", userSchema);
