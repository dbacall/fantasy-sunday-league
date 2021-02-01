const supertest = require('supertest');
const app = require('../../app');

module.exports = async (name, id) => {
  var result = {};
  const data = {
    name: name,
    owner: id,
  };
  await supertest(app)
    .post('/sunday-league/new')
    .send(data)
    .then((res) => {
      result = res;
    });

  return result;
};
