const Service = require('./service');
const SundayLeagueFixture = require('../models/sundayLeagueFixture')
const getIndividualResults = require('./utilities/getIndividualResults')

class SundayLeagueSeasonService extends Service {
  constructor(model) {
    super(model);
    this.create = this.create.bind(this);
    this.getResults = this.getResults.bind(this);
  }

  async create(data) {
    const response = await super.create(data);
    if (data.number > 1) {
      const filter = {
        number: data.number - 1,
      };
      const update = { current: false };
      await this.model.findOneAndUpdate(filter, update);
    }
    return response;
  }

  async getResults(teams) {
    try {
      let seasonResults = []
      for (const team of teams) {
        const fixtures = await SundayLeagueFixture.find({ $or: [{ homeTeam: team.id }, { awayTeam: team.id }] })

        const teamResults = getIndividualResults(team, fixtures)

        seasonResults.push(teamResults)
      }
      return {
        error: false,
        statusCode: 200,
        data: seasonResults,
      };
    } catch (errors) {
      return {
        error: true,
        statusCode: 500,
        errors,
      };
    }
  }

}

module.exports = SundayLeagueSeasonService;
