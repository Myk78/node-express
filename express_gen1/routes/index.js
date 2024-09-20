var express = require('express');
var router = express.Router();
// const usermodel = require('./users');
const Usermodel = require('./users');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(Usermodel.authenticate()));



// const { name } = require('ejs');
// const app = require('../app');
const app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/flash', function(req, res, next) {
  req.flash("age",34);
  req.flash("name","yaseen");
  res.send("dahak lay bhai");
  // res.render('index');
});
router.get('/checkar', function(req, res, next) {
  
  res.send('be kay terminal pay dahak choco');
  console.log(req.flash(["age"]),req.flash(["name"]));

});

router.get('/create',async function (req, res){
  let usercreate = await Usermodel.create({
    uname: "shazi1",
    name: "shahzieb",
    description: "i in school",
    categories:['math','science','physics']
  });
  res.send(usercreate);
});
router.get('/showdata',async function (req, res) {
  let regx = new RegExp('^shazi$','i')
  let data = await Usermodel.find({categories: { $all: ["laravel"] } });
  res.send(data);
  
});
router.get('/todaydata', async function (req, res) {
  let d1 = new Date('2024-08-04');
  let d2 = new Date('2024-08-05');
  let data = await Usermodel.find({createdDate:{$gt: d1,$lt: d2}});
  res.send(data);
  
});
router.get('/valid', async function (req, res) {
  let data = await Usermodel.find({categories:{$exists:true} });
  res.send(data);
  
});
router.get('/length', async function(req, res){
  let data = await Usermodel.find({
    $expr:{
       $and:
      [
        {$gte: [{$strLenCP:'$name'},3]},
        {$lte: [{$strLenCP:'$name'},6]}
   ]
  }
});
res.send(data);
});

//register route
router.post('/register',function(req,res){
  var userdata = new Usermodel({
    username:req.body.username,
    secret:req.body.secret
  });
  Usermodel.register(userdata, req.body.password)
  .then(function (registereduser){
    passport.authenticate("local")(req,res,function(){
      res.redirect('/profile'); // --> now create this route
    });
  });
});
router.get('/profile',isloggedIn,function(req,res){
  res.send("ap authenticate login hu");
})

//login
// login kay under hm nay route kay bad middleware likha ha or phir function

router.post("/login",passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect:"/"
}), function(req,res){});

//logout
app.get('/logout',function(req,res,next){
  req.logout(function(err){
    if (err) { return next(err); }
    res.redirect("/");
  });
});

// protection if user is logedin so show the logedin side otherwise redirect on dashboard

function isloggedIn(req,res,next){
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}


module.exports = router;
