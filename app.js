const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const routes = require('./routes');

// Initializing Express
const app = express();

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Parse requests on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logins with Passport
app.use(passport.initialize());
app.use(passport.session());

// Handle routes
app.use('/', routes);
