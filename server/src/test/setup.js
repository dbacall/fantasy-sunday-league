const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
before(async () => {
  global.registerUser = require('./helpers/registerUser');
  global.loginUser = require('./helpers/loginUser');
  global.addSundayLeague = require('./helpers/addSundayLeague');
  global.addSundayLeagueTeam = require('./helpers/addSundayLeagueTeam');
});

afterEach(async () => {
  await mongoose.connection.dropDatabase(() => {});
});

after(async () => {
  await mongoose.connection.dropDatabase(() => {});
  mongoose.connection.close(() => {
    console.log('Test database connection closed');
  });
});
