const b = require('./script');
// console.log(b);


var oneLinerJoke = require('one-liner-joke');
var getjoke = oneLinerJoke.getRandomJoke();
// console.log(getjoke);

const express = require('express')
const app = express()

app.set("view engine","ejs");
app.use(express.static('./public/'));

// middleware 
app.use(function (req, res, next) {
    console.log('kar kay hi chor nah h ')
    next()
  })

app.get('/', function (req, res) {
  res.send('kiya bat h jani kal interview crack')
})
app.get('/home', function (req, res) {
    res.render('index',{name: "Yaseen"})
  })
app.get('/myk', function (req, res) {
    res.send('good morning')
  })
app.get('/profile/:username',function(req,res,next) {
    res.send(`heloo putar ${req.params.username }`)
})

app.get('/error', (req, res) => {
    throw Error('nh mil rah h') // Express will catch this on its own.
  })
app.use(function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  })


app.listen(3000)