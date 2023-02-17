const router = require('express').Router();
const User = require('../models/user');
const BadRequestError = require('../errors/BadRequestError')
const InternalServerError = require('../errors/InternalServerError')
const NotFoundError = require('../errors/NotFoundError')
const {getUsers, postUsers, findUsersById, patchUsers, patchUsersAvatar} = require('../controllers/users')

router.get('/users', getUsers);
router.post('/users', postUsers);
router.get('/users/:id', findUsersById);
router.patch('/users/me', patchUsers);
router.patch('/users/me/avatar', patchUsersAvatar);

module.exports = router;