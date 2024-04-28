// article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  source: { type: mongoose.Schema.Types.ObjectId, ref: 'Source' },
  link: String,
  imageUrl: String
});

module.exports = mongoose.model('Article', articleSchema);
