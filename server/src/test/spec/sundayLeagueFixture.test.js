const expect = require('chai').expect;
const SundayLeagueFixture = require('../../models/sundayLeagueFixture');
const supertest = require('supertest');
const app = require('../../app');

describe('Sunday league fixture tests:', () => {
  let user;
  let league;
  let season;
  let seasonId;
  let gameweek;
  let team1;
  let team2;
  let date;
  let gameweekId;
  let homeTeamId;
  let awayTeamId;
  beforeEach(async () => {
    user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    league = await addSundayLeague('league1', user._id);

    season = await addSundayLeagueSeason(1, 2020, 2021, league.body.data.id);

    seasonId = season.body.data._id;

    gameweek = await addSundayLeagueGameweek(1, seasonId);

    team1 = await addSundayLeagueTeam('team1', league.body.data.id);
    team2 = await addSundayLeagueTeam('team2', league.body.data.id);

    date = new Date(2021, 02, 24, 15, 00, 00, 0);

    gameweekId = gameweek.body.data._id;
    homeTeamId = team1.body.data._id;
    awayTeamId = team2.body.data._id;
  });

  it('should let you add a fixture for a gameweek', async () => {
    await addSundayLeagueFixture(
      homeTeamId,
      awayTeamId,
      date,
      gameweekId,
      seasonId
    );

    const result = await SundayLeagueFixture.findOne({
      gameweek: gameweekId,
    });

    expect(result.homeTeam.toString()).to.equal(homeTeamId);
    expect(result.awayTeam.toString()).to.equal(awayTeamId);
    expect(result.homeTeamGoals).to.equal(0);
    expect(result.awayTeamGoals).to.equal(0);
    expect(result.draw).to.be.false;
    expect(result.completed).to.be.false;
    expect(result.date.getTime()).to.equal(date.getTime());
    expect(result.gameweek.toString()).to.eq(gameweekId);
    expect(result.season.toString()).to.eq(seasonId);
  });

  it('should get a fixture with goals', async () => {
    const fixture = await addSundayLeagueFixture(
      homeTeamId,
      awayTeamId,
      date,
      gameweekId,
      seasonId
    );

    const player = await addSundayLeaguePlayer(
      'Bob',
      'Smith',
      'Defender',
      homeTeamId
    );

    const fixtureId = fixture.body.data.id;

    await addSundayLeagueGoal(
      player.body.data._id,
      20,
      fixtureId,
      homeTeamId,
      seasonId
    );

    const result = await supertest(app).get(
      `/sunday-league/fixture/${fixtureId}/current`
    );

    expect(result.body.homeTeam.toString()).to.equal(homeTeamId);
    expect(result.body.awayTeam.toString()).to.equal(awayTeamId);
    expect(result.body.homeTeamGoals).to.equal(1);
    expect(result.body.awayTeamGoals).to.equal(0);
    expect(result.body.draw).to.be.false;
    expect(result.body.completed).to.be.false;
    expect(result.body.gameweek.toString()).to.eq(gameweekId);
    expect(result.body.season.toString()).to.eq(seasonId);
    expect(result.body.goals).to.have.length(1);
  });
});
