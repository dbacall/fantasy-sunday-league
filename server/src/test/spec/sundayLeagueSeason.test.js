const expect = require('chai').expect;
const SundayLeagueSeason = require('../../models/sundayLeagueSeason');
const SundayLeague = require('../../models/sundayLeague')
const supertest = require('supertest');
const app = require('../../app');

describe('Sunday league season tests:', () => {
  let user
  let league

  beforeEach(async () => {
    user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    league = await addSundayLeague('league1', user._id);
  })

  it('should let you add a season for a league', async () => {
    await addSundayLeagueSeason(1, 2020, 2021, league.body.data.id);

    const result = await SundayLeagueSeason.findOne({
      number: 1,
    });

    expect(result.number).to.equal(1);
    expect(result.yearFrom).to.equal(2020);
    expect(result.yearTo).to.equal(2021);
    expect(result.current).to.equal(true);
    expect(result.league.toString()).to.eq(league.body.data.id);
  });

  it('should let update current of previous season if add a new season', async () => {
    await addSundayLeagueSeason(1, 2020, 2021, league.body.data.id);
    await addSundayLeagueSeason(2, 2021, 2022, league.body.data.id);

    const result = await SundayLeagueSeason.findOne({
      number: 1,
    });

    expect(result.number).to.equal(1);
    expect(result.current).to.equal(false);
  });

  it('should only get the current season', async () => {
    await addSundayLeagueSeason(1, 2020, 2021, league.body.data.id);
    await addSundayLeagueSeason(2, 2021, 2022, league.body.data.id);

    const result = await supertest(app).get('/sunday-league/season');

    expect(result.body.number).to.equal(2);
    expect(result.body.current).to.equal(true);
  });

  it.only('should get an object with all results for each team', async () => {
    const season = await addSundayLeagueSeason(1, 2020, 2021, league.body.data.id);

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

    const fixture1 = await addSundayLeagueFixture(homeTeam1Id, awayTeam1Id, date, gameweekId);
    await addSundayLeagueFixture(homeTeam2Id, awayTeam2Id, date, gameweekId);
    await addSundayLeagueFixture(homeTeam1Id, awayTeam1Id, date, gameweekId);
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

    await supertest(app).put(
      `/sunday-league/gameweek/${gameweekId}/complete`
    );

    const { teams } = await SundayLeague.findById(league.body.data.id).populate('teams')
    const teamsString = JSON.stringify(teams);

    const results = await supertest(app).get(`/sunday-league/season/results/${teamsString}`);

    expect(results.body[0].id).to.equal(homeTeam1Id)
    expect(results.body[0].won).to.equal(1)
    expect(results.body[0].lost).to.equal(0)
    expect(results.body[0].drawn).to.equal(1)
    expect(results.body[0].points).to.equal(4)
    expect(results.body[0].goalsFor).to.equal(1)
    expect(results.body[0].goalsAgainst).to.equal(0)
    expect(results.body[1].id).to.equal(awayTeam1Id)
    expect(results.body[1].won).to.equal(0)
    expect(results.body[1].lost).to.equal(1)
    expect(results.body[1].drawn).to.equal(1)
    expect(results.body[1].goalsFor).to.equal(0)
    expect(results.body[1].goalsAgainst).to.equal(1)
    expect(results.body[1].points).to.equal(1)

  });
});
