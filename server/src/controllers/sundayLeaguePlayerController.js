const Controller = require('./controller');
const SundayLeaguePlayerService = require('../services/sundayLeaguePlayerService');
const SundayLeaguePlayer = require('../models/sundayLeaguePlayer');

const sundayLeaguePlayerService = new SundayLeaguePlayerService(
  SundayLeaguePlayer
);

class SundayLeaguePlayerController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new SundayLeaguePlayerController(sundayLeaguePlayerService);
