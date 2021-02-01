const expect = require('chai').expect;
const SundayLeagueGameweek = require('../../models/sundayLeagueGameweek');
const supertest = require('supertest');
const app = require('../../app');

describe('Sunday league gameweek tests:', () => {
  let user
  let league
  let season

  beforeEach(async () => {
    user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    league = await addSundayLeague('league1', user._id);

    season = await addSundayLeagueSeason(
      1,
      2020,
      2021,
      league.body.data.id
    );
  })

  it('should let you add a gameweek for a season', async () => {
    await addSundayLeagueGameweek(1, season.body.data._id);

    const result = await SundayLeagueGameweek.findOne({
      number: 1,
    });

    expect(result.number).to.equal(1);
    expect(result.current).to.be.true;
    expect(result.season.toString()).to.eq(season.body.data._id);
  });

  it('should throw an error if number is less than 1', async () => {
    const result = await addSundayLeagueGameweek(0, season.body.data._id);

    expect(result.body.errors.number.message).to.equal(
      'The lowest number for a gameweek is 1'
    );
  });

  it('should let update current of previous gameweek if add a new season', async () => {
    await addSundayLeagueGameweek(1, season.body.data._id);
    await addSundayLeagueGameweek(2, season.body.data._id);

    const result = await SundayLeagueGameweek.findOne({
      number: 1,
    });

    expect(result.number).to.equal(1);
    expect(result.current).to.be.false;
  });

  it('should only get the current gameweek', async () => {
    const seasonId = season.body.data._id;

    await addSundayLeagueGameweek(1, seasonId);
    await addSundayLeagueGameweek(2, seasonId);

    const result = await supertest(app).get(
      `/sunday-league/gameweek/${seasonId}/current`
    );

    expect(result.body.number).to.equal(2);
    expect(result.body.current).to.equal(true);
  });

  it('should get the current gameweek with a list of fixtures', async () => {
    const seasonId = season.body.data._id;

    const gameweek = await addSundayLeagueGameweek(1, seasonId);

    const team1 = await addSundayLeagueTeam('team1', league.body.data.id);
    const team2 = await addSundayLeagueTeam('team2', league.body.data.id);
    const team3 = await addSundayLeagueTeam('team3', league.body.data.id);
    const team4 = await addSundayLeagueTeam('team4', league.body.data.id);

    const date = new Date(2021, 02, 24, 15, 00, 00, 0);

    const gameweekId = gameweek.body.data._id;
    const homeTeam1Id = team1.body.data._id;
    const awayTeam1Id = team2.body.data._id;
    const homeTeam2Id = team3.body.data._id;
    const awayTeam2Id = team4.body.data._id;

    await addSundayLeagueFixture(
      homeTeam1Id,
      awayTeam1Id,
      date,
      gameweekId,
      seasonId
    );
    await addSundayLeagueFixture(
      homeTeam2Id,
      awayTeam2Id,
      date,
      gameweekId,
      seasonId
    );

    const result = await supertest(app).get(
      `/sunday-league/gameweek/${seasonId}/current`
    );

    expect(result.body.number).to.equal(1);
    expect(result.body.current).to.equal(true);
    expect(result.body.fixtures).to.have.length(2);
    expect(result.body.fixtures[0].homeTeam).to.eq(homeTeam1Id);
    expect(result.body.fixtures[1].homeTeam).to.eq(homeTeam2Id);
  });

  it('should get a specific gameweek with a list of fixtures', async () => {
    const seasonId = season.body.data._id;

    await addSundayLeagueGameweek(1, seasonId);
    const gameweek = await addSundayLeagueGameweek(2, seasonId);
    await addSundayLeagueGameweek(3, seasonId);

    const team1 = await addSundayLeagueTeam('team1', league.body.data.id);
    const team2 = await addSundayLeagueTeam('team2', league.body.data.id);
    const team3 = await addSundayLeagueTeam('team3', league.body.data.id);
    const team4 = await addSundayLeagueTeam('team4', league.body.data.id);

    const date = new Date(2021, 02, 24, 15, 00, 00, 0);

    const gameweekId = gameweek.body.data._id;
    const homeTeam1Id = team1.body.data._id;
    const awayTeam1Id = team2.body.data._id;
    const homeTeam2Id = team3.body.data._id;
    const awayTeam2Id = team4.body.data._id;

    await addSundayLeagueFixture(homeTeam1Id, awayTeam1Id, date, gameweekId);
    await addSundayLeagueFixture(homeTeam2Id, awayTeam2Id, date, gameweekId);

    const result = await supertest(app).get(
      `/sunday-league/gameweek/${seasonId}/2`
    );

    expect(result.body.number).to.equal(2);
    expect(result.body.current).to.equal(false);
    expect(result.body.fixtures).to.have.length(2);
    expect(result.body.fixtures[0].homeTeam).to.eq(homeTeam1Id);
    expect(result.body.fixtures[1].homeTeam).to.eq(homeTeam2Id);
  });

  it('should update and complete all fixtures in a gameweek', async () => {
    const seasonId = season.body.data._id;

    await addSundayLeagueGameweek(1, seasonId);
    const gameweek = await addSundayLeagueGameweek(2, seasonId);
    await addSundayLeagueGameweek(3, seasonId);

    const team1 = await addSundayLeagueTeam('team1', league.body.data.id);
    const team2 = await addSundayLeagueTeam('team2', league.body.data.id);
    const team3 = await addSundayLeagueTeam('team3', league.body.data.id);
    const team4 = await addSundayLeagueTeam('team4', league.body.data.id);

    const date = new Date(2021, 02, 24, 15, 00, 00, 0);

    const gameweekId = gameweek.body.data._id;
    const homeTeam1Id = team1.body.data._id;
    const awayTeam1Id = team2.body.data._id;
    const homeTeam2Id = team3.body.data._id;
    const awayTeam2Id = team4.body.data._id;

    const fixture1 = await addSundayLeagueFixture(homeTeam1Id, awayTeam1Id, date, gameweekId);
    await addSundayLeagueFixture(homeTeam2Id, awayTeam2Id, date, gameweekId);

    const player = await addSundayLeaguePlayer(
      'Bob',
      'Smith',
      'Defender',
      homeTeam1Id
    );

    await addSundayLeagueGoal(
      player.body.data.id,
      20,
      fixture1.body.data.id,
      homeTeam1Id,
      seasonId
    );

    const result = await supertest(app).put(
      `/sunday-league/gameweek/${gameweekId}/complete`
    );

    const completedFixtures = result.body.fixtures

    expect(completedFixtures[0].winner).to.equal(homeTeam1Id)

  })
});
