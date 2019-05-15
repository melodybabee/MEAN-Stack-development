// create model using mongoose
const mongoose = require('mongoose');
// create a blueprint of how the data looks like
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true},
  imagePath: { type: String, required: true}
});

module.exports = mongoose.model("Post", postSchema);
