// source.js
const mongoose = require('mongoose');

const sourceSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  visible: { type: Boolean, default: true },
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  score: { type: Number, default: 25 } // You can calculate this on the fly if needed
});

module.exports = mongoose.model('Source', sourceSchema);
