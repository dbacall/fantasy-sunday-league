const express = require('express');
const router = express.Router();
const SundayLeagueController = require('../controllers/sundayLeagueController');

router.post('/new', SundayLeagueController.create);
router.get('/:id/:idType', SundayLeagueController.getAllById);

module.exports = router;
