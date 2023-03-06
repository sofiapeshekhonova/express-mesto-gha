const bcrypt = require('bcrypt');
const isEmail = require('validator/lib/isEmail');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Must be at least 2 characters.'], // минимальная длина имени — 2 символа
    maxlength: [30, 'Must be at less than 30 characters.'], // а максимальная — 30 символов
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Must be at least 2 characters.'],
    maxlength: [30, 'Must be at less than 30 characters.'],
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [isEmail, 'Неправильный формат почты'],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject();
    }
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      return Promise.reject();
    }
    return user;
  } catch (err) {
    return Promise.reject();
  }
};

module.exports = mongoose.model('User', userSchema);
