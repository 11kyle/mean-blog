var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');
var User = require('./models/user');
// Add oAuthentication

var app = express();

app.set('port', (process.env.PORT || 5000));

mongoose.Promise = require('bluebird');
// Connect to a database
mongoose.connect('mongodb://localhost:27017/blogfall2016');

// Parse incoming content
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'I love New York',
    resave: true,
    saveUninitialized: false // read the readme on express-session
}));

// Initialize passport and passport session
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// GET /all static content
app.use(express.static(__dirname + '/public'));
// Set the view engine to ejs
app.set('view engine', 'ejs');

// include routes
var routes = require('./routes/index');
app.use('/', routes);

// Listen on port 3000
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
