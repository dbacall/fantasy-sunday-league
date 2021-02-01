const supertest = require('supertest');
const app = require('../../app');

module.exports = async (name, league) => {
  var result = {};
  const data = {
    name,
    league,
  };
  await supertest(app)
    .post('/sunday-league/team')
    .send(data)
    .then((res) => {
      result = res;
    });

  return result;
};
