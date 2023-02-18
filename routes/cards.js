const express = require('express');
const router = express.Router();

const { getCards, postCards, deleteCards, putLikes, deleteLikes } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', postCards);
router.delete('/cards/:cardId', deleteCards)
router.put('/cards/:cardId/likes', putLikes);
router.delete('/cards/:cardId/likes', deleteLikes);

module.exports = router;