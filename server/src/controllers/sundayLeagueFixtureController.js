const Controller = require('./controller');
const SundayLeagueFixtureService = require('../services/sundayLeagueFixtureService');
const SundayLeagueFixture = require('../models/sundayLeagueFixture');

const sundayLeagueFixtureService = new SundayLeagueFixtureService(
  SundayLeagueFixture
);

class SundayLeagueFixtureController extends Controller {
  constructor(service) {
    super(service);
    this.getFixture = this.getFixture.bind(this);
  }

  async getFixture(req, res) {
    let response = await this.service.getFixture(req.params);
    if (response.error) return res.status(response.statusCode).send(response);
    return res.status(201).send(response.data);
  }
}

module.exports = new SundayLeagueFixtureController(sundayLeagueFixtureService);
