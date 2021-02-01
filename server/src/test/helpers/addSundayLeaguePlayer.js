const supertest = require('supertest');
const app = require('../../app');

module.exports = async (firstName, surname, position, team) => {
  const data = {
    firstName,
    surname,
    position,
    team,
  };
  const response = await supertest(app)
    .post('/sunday-league/player')
    .send(data);

  return response;
};
