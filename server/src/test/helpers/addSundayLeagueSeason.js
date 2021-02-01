const supertest = require('supertest');
const app = require('../../app');

module.exports = async (number, yearFrom, yearTo, league) => {
  const data = {
    number,
    yearFrom,
    yearTo,
    league,
  };
  const response = await supertest(app)
    .post('/sunday-league/season')
    .send(data);

  return response;
};
