const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const promisify = require('es6-promisify');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const helpers = require('./helpers');
const routes = require('./routes');

// Initializing Express
const app = express();

// Pug View Engine
app.set('views', path.join(__dirname, 'views')); // Pug files folder
app.set('view engine', 'pug');

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Parse requests on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data validation
app.use(expressValidator());

// req.cookies
app.use(cookieParser());

// Store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Logins with Passport
app.use(passport.initialize());
app.use(passport.session());

// Passes error to next page request
app.use(flash());

// Pass Pug Variables
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// Promisify callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// Handle routes
app.use('/', routes);

module.exports = app;
