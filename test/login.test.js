const expect = require('chai').expect;
const registerHelpers = require('./helpers/register_helpers').default;
const loginHelpers = require('./helpers/login_helpers').default;

describe('Login', () => {
  it('should login a registered user', async () => {
    await registerHelpers.registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    var data = await loginHelpers.loginUser(
      'dbacall@hotmail.co.uk',
      'password'
    );

    expect(data.body.success).to.be.true;
    expect(data.body.token).to.exist;
  });

  it('should return an error if user is not registered', async () => {
    var data = await loginHelpers.loginUser(
      'dbacall@hotmail.co.uk',
      'password'
    );

    expect(data.body.emailnotfound).to.equal('Email not found');
  });

  it('should return an error if user inputs wrong password', async () => {
    await registerHelpers.registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    var data = await loginHelpers.loginUser('dbacall@hotmail.co.uk', 'passwo');

    expect(data.body.passwordIncorrect).to.equal('Password incorrect');
  });

  it('should return errors if email and password field are left empty', async () => {
    await registerHelpers.registerUser(
      'David',
      'Bacall',
      'dbacall@hotmail.co.uk',
      'password',
      'password'
    );

    var data = await loginHelpers.loginUser('', '');

    expect(data.body.email).to.equal('Email field is required');
    expect(data.body.password).to.equal('Password field is required');
  });
});