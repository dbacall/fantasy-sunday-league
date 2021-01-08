const express = require('express');
const router = express.Router();
const sundayLeagueGameweekController = require('../controllers/sundayLeagueGameweekController');

router.post('/', sundayLeagueGameweekController.create);
router.get('/', sundayLeagueGameweekController.getCurrent);
// router.get('/:id/:idType', sundayLeagueGameweekController.getAllById);

module.exports = router;
