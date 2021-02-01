const expect = require('chai').expect;
const SundayLeaguePlayer = require('../../models/sundayLeaguePlayer');

describe('Sunday league player tests:', () => {
  it('should let a user add a player to a team', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const leagueAdded = await addSundayLeague('league1', user._id);

    const teamAdded = await addSundayLeagueTeam(
      'team1',
      leagueAdded.body.data.id
    );

    await addSundayLeaguePlayer(
      'Bob',
      'Smith',
      'Defender',
      teamAdded.body.data.id
    );

    const result = await SundayLeaguePlayer.findOne({
      firstName: 'Bob',
    });

    expect(result.firstName).to.equal('Bob');
    expect(result.surname).to.equal('Smith');
    expect(result.position).to.equal('Defender');
    expect(result.team.toString()).to.eq(teamAdded.body.data.id);
  });

  it('should throw an error if first name is empty', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const leagueAdded = await addSundayLeague('league1', user._id);

    const teamAdded = await addSundayLeagueTeam(
      'team1',
      leagueAdded.body.data.id
    );

    const result = await addSundayLeaguePlayer(
      '',
      'Smith',
      'Defender',
      teamAdded.body.data.id
    );

    expect(result.body.errors.firstName.message).to.equal(
      'First name needs to be entered'
    );
  });

  it('should throw an error if surname is empty', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const leagueAdded = await addSundayLeague('league1', user._id);

    const teamAdded = await addSundayLeagueTeam(
      'team1',
      leagueAdded.body.data.id
    );

    const result = await addSundayLeaguePlayer(
      'Bob',
      '',
      'Defender',
      teamAdded.body.data.id
    );

    expect(result.body.errors.surname.message).to.equal(
      'Surname needs to be entered'
    );
  });

  it('should throw an error if position is wrong', async () => {
    const user = await registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    const leagueAdded = await addSundayLeague('league1', user._id);

    const teamAdded = await addSundayLeagueTeam(
      'team1',
      leagueAdded.body.data.id
    );

    const result = await addSundayLeaguePlayer(
      'Bob',
      'Smith',
      'Shooter',
      teamAdded.body.data.id
    );

    expect(result.body.errors.position.message).to.equal(
      'Position must be goalkeeper, defender, midfielder or forward'
    );
  });
});
