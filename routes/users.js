const { celebrate, Joi } = require('celebrate');
const express = require('express');

const router = express.Router();

const {
  getUsers,
  findUsersById,
  updateUser,
  patchUsersAvatar,
  getUser,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getUser);

router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex(),
  }),
}), findUsersById);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
  }),
}), patchUsersAvatar);

module.exports = router;
