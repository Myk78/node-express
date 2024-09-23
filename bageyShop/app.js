var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var usersRouter = require("./routes/usersRouters");
var ownerRouter = require("./routes/ownerRouters");
var productRouter = require("./routes/productRouters");
var index = require("./routes/index");

var db = require("./config/mongoose-connect");
var app = express();
require("dotenv").config();
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/owner", ownerRouter);
app.use("/product", productRouter);
app.use("/", index);

module.exports = app;
