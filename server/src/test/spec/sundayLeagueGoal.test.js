const expect = require('chai').expect;
const SundayLeagueGoal = require('../../models/sundayLeagueGoal');
const supertest = require('supertest');
const app = require('../../app');

describe('Sunday league goal tests:', () => {
  it('should let you add a goal', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const league = await addSundayLeague('league1', user._id);

    const season = await addSundayLeagueSeason(
      1,
      2020,
      2021,
      league.body.data.id
    );

    const seasonId = season.body.data._id;

    const gameweek = await addSundayLeagueGameweek(1, seasonId);

    const homeTeam = await addSundayLeagueTeam('team1', league.body.data.id);
    const awayTeam = await addSundayLeagueTeam('team2', league.body.data.id);

    const homeTeamId = homeTeam.body.data.id;

    const player = await addSundayLeaguePlayer(
      'Bob',
      'Smith',
      'Defender',
      homeTeamId
    );

    const awayTeamId = awayTeam.body.data.id;

    const gameweekId = gameweek.body.data.id;

    const date = new Date(2021, 02, 24, 15, 00, 00, 0);

    const fixture = await addSundayLeagueFixture(
      homeTeamId,
      awayTeamId,
      date,
      gameweekId,
      seasonId
    );

    await addSundayLeagueGoal(
      player.body.data.id,
      20,
      fixture.body.data.id,
      homeTeamId,
      seasonId
    );

    const result = await SundayLeagueGoal.findOne({
      season: seasonId,
    });

    expect(result.player).to.equal(player.body.data.id);
    expect(result.minute).to.equal(20);
  });
});
