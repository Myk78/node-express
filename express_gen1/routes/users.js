// // const { default: mongoose } = require('mongoose');
// const mongodb = require('mongoose');
// const plm = require('passport-local-mongoose');

// mongodb.connect("mongodb://127.0.0.1:27017/gen1");

// // const userschema = mongoose.Schema({
// //   uname: String,
// //   name: String,
// //   description: String,
// //   categories:{
// //     type: Array,
// //     default: []
// //   },
// //   createdDate:{
// //     type:Date,
// //     default:Date.now()
// //   }
// // });

// const Userschema = mongoose.Schema({
//   username:String,
//   password:String,
//   secrat:String
// });
// Userschema.plugin(plm);
// module.exports = mongoose.model('User',Userschema);
// // const User = mongoose.model('User', Userschema);
// // module.exports = User;
// // module.exports = mongoose.model('valid',validschema);

// users.js
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/gen1", { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  secret: String
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
module.exports = User;
