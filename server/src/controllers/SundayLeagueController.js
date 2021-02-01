const Controller = require('./controller');
const SundayLeagueService = require('../services/sundayLeagueService');
const SundayLeague = require('../models/sundayLeague');

const sundayLeagueService = new SundayLeagueService(SundayLeague);

class SundayLeagueController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new SundayLeagueController(sundayLeagueService);
