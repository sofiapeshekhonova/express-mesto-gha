const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2 characters.'],
    maxlength: [30, 'Must be at less than 30 characters.'],
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    required: true,
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: Array,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
