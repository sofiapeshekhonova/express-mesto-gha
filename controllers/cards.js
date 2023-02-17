const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');

// module.exports.createCard = (req, res) => {
//   console.log(req.user._id); // _id станет доступен
// };

//GET /cards — возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else if (err.name === "InternalServerError") {
      next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};

//POST /cards — создаёт карточку
module.exports.postCards = (req, res, next) => {
  const {name,link} = req.body
  Card.create({ name, link, owner: req.user._id })
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else if (err.name === "InternalServerError") {
      next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};

//DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCards= (req, res, next) => {
  Card.findById(req.params.id)
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if(err.name === 'NotFoundError') {
      next(new NotFoundError('Карточка с указанным _id не найдена.'))
    } else {
      next(err);
    }
  });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.putLikes= (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
    } else if(err.name === 'NotFoundError') {
      next(new NotFoundError('Передан несуществующий _id карточки.'))
    } else if (err.name === "InternalServerError") {
      next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.deleteLikes= (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      next(new BadRequestError('Переданы некорректные данные для снятии лайка.'));
    } else if(err.name == 'NotFoundError') {
      next(new NotFoundError('Передан несуществующий _id карточки.'))
    } else if (err.name === "InternalServerError") {
      next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};