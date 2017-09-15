var mongoose = require('mongoose');

// Blog Schema
var BlogSchema = mongoose.Schema({
  title: { type: String, require: true },
  author: { type: String, default: 'Kyle Johnson' },
  image: { },
  body: { type: String },
  tag: { type: String, enum: ['POLITICS', 'ECONOMY', 'EDUCATION'] },
  posted: { type: Date, default: Date.now }
}, {collection: 'blog-posts'});

var BlogModel = mongoose.model("Blog", BlogSchema);

module.exports = BlogModel;
