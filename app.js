var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const dotenv = require('dotenv').config()
var indexRouter = require('./routes/index');

var models = require('./models');

var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session') ({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(require('connect-multiparty')());
app.use('/',express.static(path.join(__dirname, 'public')));
app.use('/bingo',express.static(path.join(__dirname, 'public')));

app.use('/bingo', indexRouter);

module.exports = app;

app.listen(process.env.PORT || '8080',process.env.IP,() => console.log("Server is running."));
