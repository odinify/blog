const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  markdown: {
    type: String,
    required: true,
  },
  HTML: {
    type: String,
    required: true,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  content: contentSchema,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
