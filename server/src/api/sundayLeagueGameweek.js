const express = require('express');
const router = express.Router();
const sundayLeagueGameweekController = require('../controllers/sundayLeagueGameweekController');

router.post('/', sundayLeagueGameweekController.create);
router.get('/:id/current', sundayLeagueGameweekController.getCurrent);
router.get('/:id/:number', sundayLeagueGameweekController.getSpecificGameweek);
router.put('/:id/complete', sundayLeagueGameweekController.completeGameweek);
// router.get('/:id/:idType', sundayLeagueGameweekController.getAllById);

module.exports = router;
