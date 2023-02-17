//const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError')
const InternalServerError = require('../errors/InternalServerError')
const NotFoundError = require('../errors/NotFoundError')

//GET /users — возвращает всех пользователей
module.exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch((err) => {
    console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
  })
};

//POST /users — создаёт пользователя
module.exports.postUsers = (req, res) => {
  const {name,about,avatar, } = req.body // получим из объекта запроса данные
  User.create({name,about,avatar})
  .then(user => res.send({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id}))
  .catch((err) => {
    if (err.name == "BadRequestError") {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    } else if (err.name == "InternalServerError") {
      next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  })
};

//GET /users/:userId - возвращает пользователя по _id
module.exports.findUsersById = (req, res) => {
  User.findById(req.params.id)
    .then(user => res.send(user))
    .catch((err)=> {
      if(err.name = 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден'))
      } else if (err.name == "InternalServerError") {
        next(new InternalServerError('Ошибка по умолчанию'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me — обновляет профиль
module.exports.patchUsers = (req, res) => {
  if (!users[req.user._id]) {
    res.send(`Такого пользователя не существует`);
    return;
  }
  const {name,about} = req.body
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true})
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name == "BadRequestError") {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
      } else if(err.name = 'NotFoundError') {
        next(new NotFoundError('Пользователь по указанному _id не найден'))
      } else if (err.name == "InternalServerError") {
        next(new InternalServerError('Ошибка по умолчанию'));
      } else {
        next(err);
      }
    });
};

// PATCH /users/me/avatar — обновляет аватар
module.exports.patchUsersAvatar = (req, res) => {
  const {avatar} = req.body
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true})
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name == "BadRequestError") {
      next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    } else if(err.name = 'NotFoundError') {
      next(new NotFoundError('Пользователь по указанному _id не найден'))
    } else if (err.name == "InternalServerError") {
      next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};