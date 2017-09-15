var express = require('express');
var router = express.Router();

var User = require('../models/user');
var BlogModel = require('../models/blog');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var mid = require('../middleware');

// Get index
router.get('/', function(req, res, next) {
  res.render('index');
});
// Get login
router.get('/login', mid.loggedOut, function(req, res, next) {
  res.render('login');
});
// POST Login
router.post('/login',
  passport.authenticate('local', { successRedirect: '/admin',
                                   failureRedirect: '/login',
                                   failureFlash: true })
);

// Get admin
router.get('/admin', mid.isAuthenticated, function(req, res, next) {
  res.render('admin');
});

// GET /logout
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/'); // return to home page
      }
    });
  }
});

/////////////////////////////////////////
/////////////////////////////////////////
// Create a Post
router.post("/api/blogpost", (req, res) => {
  BlogModel.create(req.body)
  .then(
    function(doc) {
      res.json(200);
    },
    function(err) {
      res.sendStatus(400);
    }
  );
});

// Get all Posts
router.get("/api/blogpost", (req, res) => {
  BlogModel.find({}, (err, docs) => {
    if (docs) {
      res.json(docs);
    } else if (err) {
      res.sendStatus(400);
    }
  });
});

// Delete Post
router.delete("/api/blogpost/:id", (req, res) => {
  BlogModel.remove({_id: req.params.id})
    .then(
      function(status) {
        res.sendStatus(200);
      },
      function() {
        res.sendStatus(400);
      }
    );
});

// Edit Post
router.get("/api/blogpost/:id", (req, res) => { // or getPostById
  var id = postId = req.params.id;
  BlogModel.findById(postId)
    .then(
      function(post) {
        res.json(post);
      },
      function (err) {
        res.sendStatus(400);
      }
    )
});

// Update Post
router.put("/api/blogpost/:id", (req, res) => {
  var postId = req.params.id;
  var post = req.body;
  BlogModel.update({_id: postId}, {
      title: post.title,
      body: post.body
    }).then(
      function(status) {
        res.sendStatus(200);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
})

module.exports = router;
