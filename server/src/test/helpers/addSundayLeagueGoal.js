const supertest = require('supertest');
const app = require('../../app');

module.exports = async (player, minute, fixture, team, season) => {
  const data = {
    player,
    minute,
    fixture,
    team,
    season,
  };
  const response = await supertest(app).post('/sunday-league/goal').send(data);

  return response;
};
