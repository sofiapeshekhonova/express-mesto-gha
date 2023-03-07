const Card = require('../models/card');
const BadRequestError = require('../errors/BadRequestError');
const InternalServerError = require('../errors/InternalServerError');
const NotFoundError = require('../errors/NotFoundError');
const OwnerError = require('../errors/OwnerError');

// GET /cards — возвращает все карточки
module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw next(new NotFoundError('Пользователь по указанному _id не найден'));
      }
      return res.send(cards);
    })
    .catch((err) => {
      if (err.name === 'InternalServerError') {
        throw next(new InternalServerError('Ошибка по умолчанию'));
      } else {
        next(err);
      }
    });
};

//  POST /cards — создаёт карточку
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw next(new BadRequestError('Переданы некорректные данные при создании карточки'));
      } else if (err.name === 'InternalServerError') {
        throw next(new InternalServerError('Ошибка по умолчанию'));
      } else {
        next(err);
      }
    });
};

//  DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCards = (req, res, next) => {
  const owner = req.user._id;
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw next(new NotFoundError('Карточка с указанным _id не найдена.'));
      } if (card.owner.valueOf() !== owner) {
        throw next(new OwnerError('Карточка с указанным _id не найдена.'));
      }
      return card.remove()
        .then(() => res.send({ data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new NotFoundError('Передан некорректный id'));
      } else {
        next(err);
      }
    });
};

// PUT /cards/:cardId/likes — поставить лайк карточке
module.exports.putLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'InternalServerError') {
        throw next(new InternalServerError('Ошибка по умолчанию'));
      } else {
        next(err);
      }
    });
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
module.exports.deleteLikes = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw next(new NotFoundError('Карточка с указанным _id не найдена.'));
      }
      return res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      } else if (err.name === 'InternalServerError') {
        throw next(new InternalServerError('Ошибка по умолчанию'));
      } else {
        next(err);
      }
    });
};
