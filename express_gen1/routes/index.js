var express = require('express');
var router = express.Router();

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

module.exports = router;
