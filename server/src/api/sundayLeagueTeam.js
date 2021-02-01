const express = require('express');
const router = express.Router();
const sundayLeagueTeamController = require('../controllers/sundayLeagueTeamController');

router.post('/', sundayLeagueTeamController.create);
router.get('/:id/:idType', sundayLeagueTeamController.getAllById);

module.exports = router;
