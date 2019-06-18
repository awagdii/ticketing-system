var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var jwt = require('jsonwebtoken');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ticketsRouter = require('./routes/tickets');
const User = require('./model/User');
const Ticket = require('./model/Ticket');
const CONSTS = require('./utils/constants');
const DB_CONFIG = require('./utils/db-config');
const fs = require("fs");
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${DB_CONFIG.USER_NAME}:${DB_CONFIG.PASSWORD}@ticketingsystem-a9go6.mongodb.net/test?retryWrites=true&w=majority`);

var app = express();


let publicKey = fs.readFileSync('public-key.txt');


app.use(async (req, res, next) => {
    try {
        next()
    } catch (error) {
        console.log(error)
    }

})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);


const authMiddlerWare = (req, res, next) => {
    if(!req.headers['authorization'])
    {
        res.status(401).send();
    }
    const token = req.headers['authorization'].split(" ")[1];
    console.log(token);
    jwt.verify(token, publicKey, function (err, decoded) {
        if (err) res.status(401).send();
        console.log(decoded)
        req.userEmail = decoded.email;
        next();
    });
  }

  app.use('/users', usersRouter);
//will add the middle here after creating interceptor [Eman]
  app.use('/tickets',authMiddlerWare,ticketsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))

module.exports = app;
