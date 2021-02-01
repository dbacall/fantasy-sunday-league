const Service = require('./service');

class SundayLeagueTeamService extends Service {
  constructor(model) {
    super(model);
    this.getAllById = this.getAllById.bind(this);
  }

  async getAllById(query) {
    try {
      const items = await this.model
        .find({
          [query.params.idType]: query.params.id,
        })
        .populate('players');
      return {
        error: false,
        statusCode: 200,
        data: items,
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

module.exports = SundayLeagueTeamService;
