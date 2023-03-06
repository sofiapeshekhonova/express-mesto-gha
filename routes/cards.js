const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();

const {
  getCards,
  createCard,
  deleteCards,
  putLikes,
  deleteLikes,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }),
}), createCard);

router.delete('/cards/:cardId', deleteCards);
router.put('/cards/:cardId/likes', putLikes);
router.delete('/cards/:cardId/likes', deleteLikes);

module.exports = router;
