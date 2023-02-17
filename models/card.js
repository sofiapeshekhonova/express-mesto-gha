const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    default: Array,
  }],
  createdAt : {
    type : Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('card', cardSchema);