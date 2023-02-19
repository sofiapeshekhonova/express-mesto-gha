const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2 characters.'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Must be at less than 30 characters.'], // а максимальная — 30 символов
  },
  about: {
    type: String,
    required: true,
    minlength: [2, 'Must be at least 2 characters.'],
    maxlength: [30, 'Must be at less than 30 characters.'],
  },
  avatar: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);
