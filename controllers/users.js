const User = require('../models/user');
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
module.exports.postUsers = (req, res, next) => {
  const {name,about,avatar, } = req.body // получим из объекта запроса данные
  User.create({name,about,avatar})
  .then(user => res.send({
    name: user.name,
    about: user.about,
    avatar: user.avatar,
    _id: user._id}))
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
      //next(new BadRequestError('Переданы некорректные данные при создании пользователя' ));
    } else if (err.name === "InternalServerError") {
      return res.status(500).send({ message: 'Ошибка по умолчанию' })
     // next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  })
};

//GET /users/:userId - возвращает пользователя по _id
module.exports.findUsersById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        //throw next(new NotFoundError('пользователя с несуществующим в БД id'));
        throw res.status(404).send({ message: 'Передан несуществующий в БД id' })
        //{throw new NotFoundError('извини, Я потерялся')}
      }
      return res.send({ data: user });
    })
    //.catch(() => res.status(400).send({ message: 'Переданы некорректные данные' }));
    .catch((err)=> {
        if(err.name === 'CastError') {
          //next (new BadRequestError('Получение пользователя с некорректным id'))
          return res.status(400).send({ message: 'Передан некорректный id' })
        } else {
          next(err);
        }
      });
};

// PATCH /users/me — обновляет профиль
module.exports.patchUsers = (req, res, next) => {

  // if (!users[req.user._id]) {
  //   res.send(`Такого пользователя не существует`);
  //   return;
  // }
  const {name,about} = req.body
  User.findByIdAndUpdate(req.user._id, {name, about}, {new: true})
  .then((user) => {
    if (!user[req.user._id]) {
      //throw next(new NotFoundError('пользователя с несуществующим в БД id'));
      throw res.status(404).send({ message: 'Пользователь по указанному _id не найден' })
    }
  })
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
     // next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    } else if (err.name === "InternalServerError") {
      return res.status(500).send({ message: 'Ошибка по умолчанию' })
      //next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};
//http://localhost:3000/users/63ef1ba9f92d535c71085ff3/avatar
// PATCH /users/me/avatar — обновляет аватар
module.exports.patchUsersAvatar = (req, res, next) => {
  const {avatar} = req.body
  User.findByIdAndUpdate(req.user._id, {avatar}, {new: true})
  .then((user) => {
    if (!user) {
      //throw next(new NotFoundError('пользователя с несуществующим в БД id'));
      throw res.status(404).send({ message: 'Пользователь по указанному _id не найден' })
    }
  })
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' })
     // next(new BadRequestError('Переданы некорректные данные при создании пользователя'));
    } else if (err.name === "InternalServerError") {
      return res.status(500).send({ message: 'Ошибка по умолчанию' })
      //next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};