const Controller = require('./controller');
const SundayLeagueTeamService = require('../services/sundayLeagueTeamService');
const SundayLeagueTeam = require('../models/sundayLeagueTeam');

const sundayLeagueTeamService = new SundayLeagueTeamService(SundayLeagueTeam);

class SundayLeagueTeamController extends Controller {
  constructor(service) {
    super(service);
  }
}

module.exports = new SundayLeagueTeamController(sundayLeagueTeamService);
