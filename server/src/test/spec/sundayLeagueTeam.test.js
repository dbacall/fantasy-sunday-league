const expect = require('chai').expect;
const SundayLeagueTeam = require('../../models/sundayLeagueTeam');
const supertest = require('supertest');
const app = require('../../app');

describe('Team', () => {
  it('should let a user add a team to a league', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const leagueAdded = await addSundayLeague('league1', user._id);

    const team = await addSundayLeagueTeam('team1', leagueAdded.body.data.id);

    await addSundayLeaguePlayer(
      'Bob',
      'Smith',
      'Midfielder',
      team.body.data._id
    );


    const result = await SundayLeagueTeam.findOne({
      name: 'team1',
    }).populate('players');

    expect(result.name).to.equal('team1');
    expect(result.league.toString()).to.eq(leagueAdded.body.data.id);
    expect(result.players).to.have.length(1);
  });

  it('should let a user add a team to a league', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const league = await addSundayLeague('league1', user._id);

    const leagueId = league.body.data.id;

    const team = await addSundayLeagueTeam('team1', leagueId);
    const teamId = team.body.data._id;

    await addSundayLeaguePlayer('Bob', 'Smith', 'Midfielder', teamId);

    const result = await supertest(app).get(
      `/sunday-league/team/${leagueId}/league`
    );

    expect(result.body[0].name).to.equal('team1');
    expect(result.body[0].league.toString()).to.eq(leagueId);
    expect(result.body[0].players).to.have.length(1);
  });
});
