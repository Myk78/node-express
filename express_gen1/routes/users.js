const { default: mongoose } = require('mongoose');
const mongodb = require('mongoose');

mongodb.connect("mongodb://127.0.0.1/gen1");

const userschema = mongoose.Schema({
  uname: String,
  name: String,
  description: String,
  categories:{
    type: Array,
    default: []
  },
  createdDate:{
    type:Date,
    default:Date.now()
  }
});
module.exports = mongoose.model('user',userschema);