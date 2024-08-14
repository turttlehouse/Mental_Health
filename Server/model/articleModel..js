const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  },
  author: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  content: {
    type: String,
    required: true
  },
  image: {
    type: String, // URL or path to the image
    default: ''   // Default to an empty string if no image is provided
  },
  published_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['published', 'draft', 'archived'],
    default: 'draft'
  },
  likes: {
    type: Number,
    default: 0,
  },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
