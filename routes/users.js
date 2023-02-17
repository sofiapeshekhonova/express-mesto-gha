const express = require('express');
const router = express.Router();

const {getUsers, postUsers, findUsersById, patchUsers, patchUsersAvatar} = require('../controllers/users')

router.get('/users', getUsers);
router.post('/users', postUsers);
router.get('/users/:id', findUsersById);
router.patch('/users/me', patchUsers);
router.patch('/users/me/avatar', patchUsersAvatar);

module.exports = router;