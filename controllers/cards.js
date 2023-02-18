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
    console.log(`Произошла неизвестная ошибка ${err.name}: ${err.message}`);
  })
};

//POST /cards — создаёт карточку
module.exports.postCards = (req, res, next) => {
  const {name,link} = req.body
  Card.create({ name, link, owner: req.user._id })
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: 'Переданы некорректные данные при создании карточк' })
      //next(new BadRequestError('Переданы некорректные данные при создании карточки'));
    } else if (err.name === "InternalServerError") {
      return res.status(500).send({ message: 'Ошибка по умолчанию' })
      //next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};

//DELETE /cards/:cardId — удаляет карточку по идентификатору
module.exports.deleteCards= (req, res, next) => {
  Card.findById(req.params.id)
  .then((card) => {
    if (!card) {
      //throw next(new NotFoundError('Карточка с указанным _id не найдена.'));
      throw res.status(404).send({ message: 'Карточка с указанным _id не найдена.' })
    }
    return card.remove()
      .then(() => res.send({ data: card }));
  })
  .then(cards => res.send({ data: cards }))
  .catch((err) => {
    if(err.name === 'CastError') {
      return res.status(400).send({ message: 'Передан некорректный id' })
     // next(new NotFoundError('Карточка с указанным _id не найдена.'))
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
  .then((card) => {
    if (!card) {
      throw res.status(404).send({ message: 'Карточка с указанным _id не найдена.' })
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === "CastError") {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' })
      //next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
    } else if (err.name === "InternalServerError") {
      return res.status(500).send({ message: 'Ошибка по умолчанию' })
      //next(new InternalServerError('Ошибка по умолчанию'));
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
  .then((card) => {
    if (!card) {
      throw res.status(404).send({ message: 'Карточка с указанным _id не найдена.' })
    }
    return res.send(card);
  })
  .catch((err) => {
    if (err.name === "CastError") {
      return res.status(400).send({ message: 'Переданы некорректные данные для постановки лайка.' })
      //next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
    } else if (err.name === "InternalServerError") {
      return res.status(500).send({ message: 'Ошибка по умолчанию' })
      //next(new InternalServerError('Ошибка по умолчанию'));
    } else {
      next(err);
    }
  });
};