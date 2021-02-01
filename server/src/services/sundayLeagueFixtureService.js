const Service = require('./service');

class SundayLeagueFixtureService extends Service {
  constructor(model) {
    super(model);
    this.getFixture = this.getFixture.bind(this);
  }

  async getFixture(data) {
    try {
      const item = await this.model
        .findOne({
          _id: data.id,
        })
        .populate('goals');
      return {
        error: false,
        statusCode: 200,
        data: item,
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

module.exports = SundayLeagueFixtureService;
