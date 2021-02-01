const users = require('../api/user');
const sundayLeagues = require('../api/sundayLeagues');
const sundayLeagueTeam = require('../api/sundayLeagueTeam');
const sundayLeaguePlayer = require('../api/sundayLeaguePlayer');
const sundayLeagueSeason = require('../api/sundayLeagueSeason');
const sundayLeagueGameweek = require('../api/sundayLeagueGameweek');
const sundayLeagueFixture = require('../api/sundayLeagueFixture');
const sundayLeagueGoal = require('../api/sundayLeagueGoal');

module.exports = (app) => {
  // Routes
  app.use('/users', users);
  app.use('/sunday-league', sundayLeagues);
  app.use('/sunday-league/team', sundayLeagueTeam);
  app.use('/sunday-league/player', sundayLeaguePlayer);
  app.use('/sunday-league/season', sundayLeagueSeason);
  app.use('/sunday-league/gameweek', sundayLeagueGameweek);
  app.use('/sunday-league/fixture', sundayLeagueFixture);
  app.use('/sunday-league/goal', sundayLeagueGoal);
};
