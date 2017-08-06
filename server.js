var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Connect to a database
mongoose.connect('mongodb://localhost/blogfall2016');

var PostSchema = mongoose.Schema({
  title: { type: String, require: true },
  body: String,
  tag: { type: String, enum: ['POLITICS', 'ECONOMY', 'EDUCATION'] },
  posted: { type: Date, default: Date.now }
});

var PostModel = mongoose.model("PostModel", PostSchema);

// GET /all static content
app.use(express.static(__dirname + '/public'));

// Parse incoming content
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Create a Post
app.post("/api/blogpost", function createPost(req, res) {
  var post = req.body;
  PostModel.create(post) // create post in database
    .then(
      function(postObj) {
        res.json(200);
      },
      function(err) {
        res.sendStatus(400);
      }
    );
});

// Get all Posts
app.get("/api/blogpost", function getAllPosts (req, res) {
  PostModel.find({}, function (err, docs) {
    if (docs) {
      console.log(docs);
      res.json(docs);
    } else if (err) {
      res.sendStatus(400);
    }
  });
});

// Delete Post
app.delete("/api/blogpost/:id", function deletePost(req, res) {
  var id = postId = req.params.id;
  PostModel.remove({_id: postId})
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
app.get("/api/blogpost/:id", function editPost(req, res) { // or getPostById
  var id = postId = req.params.id;
  PostModel.findById(postId)
    .then(
      function(post) {
        res.json(post);
      },
      function (err) {
        res.sendStatus(400);
      }
    )
});

app.put("/api/blogpost/:id", function updatePost(req, res) {
  var postId = req.params.id;
  var post = req.body;
  PostModel
    .update({_id: postId}, {
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








app.listen(3000);
