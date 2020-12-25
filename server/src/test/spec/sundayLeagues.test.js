const expect = require('chai').expect;
const SundayLeague = require('../../models/SundayLeague');
const User = require('../../models/User');
const supertest = require('supertest');
const app = require('../../app');

describe('Sunday League', () => {
  it('lets a user add a sunday league', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const leagueAdded = await addSundayLeague('league1', user._id);

    expect(leagueAdded.body.status).to.equal(200);
    expect(leagueAdded.body.error).to.be.false;

    var league = await SundayLeague.findOne({ leagueName: 'league1' }).populate(
      'owner'
    );

    expect(league.leagueName).to.equal('league1');
    expect(league.owner.email).to.equal('dbacall@hotmail.co.uk');
  });

  it('retrieves a users owned sunday leagues', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    await addSundayLeague('league1', user._id);

    const result = await User.findOne({
      email: 'dbacall@hotmail.co.uk',
    }).populate('leagues');

    expect(result.leagues).to.be.length(1);
    expect(result.leagues[0].leagueName).to.eq('league1');

    await supertest(app)
      .get(`/sunday-leagues/${user._id}`)
      .then((res) => {
        expect(res.body.data).to.be.length(1);
      });
  });

  it('should contain a reference to an array of teams', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const sundayLeague = await addSundayLeague('league1', user._id);
    const leagueId = sundayLeague.body.data.id;
    addSundayLeagueTeam('team1', leagueId);
    addSundayLeagueTeam('team2', leagueId);

    const league = await SundayLeague.findOne({
      leagueName: 'league1',
    }).populate('teams');

    expect(league.teams).to.have.length(2);
    expect(league.teams[0].teamName).to.eq('team1');
    expect(league.teams[1].teamName).to.eq('team2');
  });
});
