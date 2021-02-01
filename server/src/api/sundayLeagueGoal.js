const express = require('express');
const router = express.Router();
const sundayLeagueGoalController = require('../controllers/sundayLeagueGoalController');

router.post('/', sundayLeagueGoalController.create);
// router.get('/', sundayLeagueGoalController.get);
// router.get('/:id/:idType', sundayLeagueGameweekController.getAllById);

module.exports = router;
