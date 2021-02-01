const express = require('express');
const router = express.Router();
const sundayLeaguePlayerController = require('../controllers/sundayLeaguePlayerController');

router.post('/', sundayLeaguePlayerController.create);
router.get('/:id/:idType', sundayLeaguePlayerController.getAllById);

module.exports = router;
