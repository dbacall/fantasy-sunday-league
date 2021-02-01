const Controller = require('./controller');
const SundayLeagueGameweekService = require('../services/sundayLeagueGameweekService');
const SundayLeagueGameweek = require('../models/sundayLeagueGameweek');

const sundayLeagueGameweekService = new SundayLeagueGameweekService(
  SundayLeagueGameweek
);

class SundayLeagueGameweekController extends Controller {
  constructor(service) {
    super(service);
    this.getSpecificGameweek = this.getSpecificGameweek.bind(this);
    this.completeGameweek = this.completeGameweek.bind(this);
  }

  async getSpecificGameweek(req, res) {
    let response = await this.service.getSpecificGameweek(req.params);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response.data);
  }

  async completeGameweek(req, res) {
    let response = await this.service.completeGameweek(req.params);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response.data);
  }
}

module.exports = new SundayLeagueGameweekController(
  sundayLeagueGameweekService
);
