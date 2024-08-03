const express = require('express');
// const { get } = require('http');

let app = express()
app.use(express.static('./public'));
app.set("view engine","ejs");

app.get('/home',function(req,res){
    res.render('index',{revi:"revision"})
});
// app.get('/home', function (req, res) {
//     res.render('index',{name: "Yaseen"})
//   })
app.listen(3000);