const expect = require('chai').expect;
const SundayLeague = require('../../models/sundayLeague');
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

    const leagueAdded = await addSundayLeague('league1', user.data._id);

    expect(leagueAdded.body.status).to.equal(200);
    expect(leagueAdded.body.error).to.be.false;

    var league = await SundayLeague.findOne({ name: 'league1' }).populate(
      'owner'
    );

    expect(league.name).to.equal('league1');
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

    await addSundayLeague('league1', user.data._id);

    const result = await User.findOne({
      email: 'dbacall@hotmail.co.uk',
    }).populate('leagues');

    expect(result.leagues).to.be.length(1);
    expect(result.leagues[0].name).to.eq('league1');
    await supertest(app)
      .get(`/sunday-league/${user.data.id}/owner`)
      .then((res) => {
        expect(res.body).to.be.length(1);
        expect(res.body[0].name).to.eq('league1');
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

    const sundayLeague = await addSundayLeague('league1', user.data.id);
    const leagueId = sundayLeague.body.data.id;
    await addSundayLeagueTeam('team1', leagueId);
    await addSundayLeagueTeam('team2', leagueId);

    const league = await SundayLeague.findOne({
      name: 'league1',
    }).populate('teams');

    expect(league.teams).to.have.length(2);
    expect(league.teams[0].name).to.eq('team1');
    expect(league.teams[1].name).to.eq('team2');
  });
});
