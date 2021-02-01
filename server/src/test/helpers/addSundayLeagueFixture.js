const supertest = require('supertest');
const app = require('../../app');

module.exports = async (homeTeam, awayTeam, date, gameweek, season) => {
  const data = {
    homeTeam,
    awayTeam,
    date,
    gameweek,
    season,
  };
  const response = await supertest(app)
    .post('/sunday-league/fixture')
    .send(data);

  return response;
};
