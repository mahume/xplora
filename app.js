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
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// Start Express app
const app = express();

// Pug view engine
app.set('views', path.join(__dirname, 'views')); // Pug files folder
app.set('view engine', 'pug');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Takes requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Methods for validating data. userController.validateRegister
app.use(expressValidator());

// Populates req.cookies
app.use(cookieParser());

// Store session data on visitors from request to request
// Keeps users logged in and allows us to send flash messages
app.use(
  session({
    secret: process.env.SECRET,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Logins
app.use(passport.initialize());
app.use(passport.session());

// Pass eror message to the next page the user requests
app.use(flash());

// Pass variables to our templates + all requests
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

app.use('/', routes);

// 404 and forward to error handler
app.use(errorHandlers.notFound);

// Check if errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// Production error handler
app.use(errorHandlers.productionErrors);

module.exports = app;
