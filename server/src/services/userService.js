const Service = require('./service');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const { promisify } = require('util');

class UserService extends Service {
  constructor(model) {
    super(model);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.hashPassword = this.hashPassword.bind(this);
  }

  async register(data) {
    const { errors, isValid } = validateRegisterInput(data);

    if (!isValid) {
      return {
        error: true,
        statusCode: 500,
        message: 'Invalid registration entries.',
        errors,
      };
    }

    const newUser = new this.model(data);

    const user = await this.model.findOne({ email: data.email });

    if (user) {
      return {
        error: true,
        statusCode: 500,
        message: 'Email already in use.',
      };
    }

    newUser.password = await this.hashPassword(newUser.password);

    const savedUser = await this.saveUser(newUser);

    return savedUser;
  }

  async login(data) {
    const { errors, isValid } = validateLoginInput(data);

    if (!isValid) {
      return {
        error: true,
        statusCode: 500,
        message: 'Invalid registration entries.',
        errors,
      };
    }

    const email = data.email;
    const password = data.password;

    const user = await User.findOne({ email }).populate('leagues');

    if (!user) {
      return {
        error: true,
        statusCode: 500,
        message: 'Email not found.',
      };
    }

    const checkPassword = promisify(bcrypt.compare);

    const passwordsMatch = await checkPassword(password, user.password);

    let response;

    if (passwordsMatch) {
      const payload = { user };

      const jwtSign = promisify(jwt.sign);

      const token = await jwtSign(payload, keys.secretOrKey, {
        expiresIn: 31556926, // 1 year in seconds
      });

      return {
        error: false,
        statusCode: 200,
        token: 'Bearer ' + token,
      };
    } else {
      response = {
        error: true,
        statusCode: 500,
        message: error.errmsg || 'Password incorrect.',
        errors,
      };
    }
    return response;
  }

  // async jwtSign(payload) {
  //   return await new Promise((resolve, reject) => {
  //     jwt.sign(
  //       payload,
  //       keys.secretOrKey,
  //       {
  //         expiresIn: 31556926, // 1 year in seconds
  //       },
  //       (error, token) => {
  //         if (error) reject();
  //         resolve({
  //           error: false,
  //           status: 200,
  //           token: 'Bearer ' + token,
  //         });
  //       }
  //     );
  //   });
  // }

  // async checkPassword(password, password2) {
  //   return await new Promise((resolve, reject) => {
  //     const passwordCorrect = bcrypt.compare(password, password2);
  //     if (passwordCorrect) resolve(true);
  //     reject(false);
  //   });
  // }

  async hashPassword(password) {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(password, salt, (error, hash) => {
          if (error) reject(error);
          resolve(hash);
        });
      });
    });

    return hashedPassword;
  }

  async saveUser(newUser) {
    let user = await newUser.save();

    if (user) {
      return {
        error: false,
        status: 200,
        data: user,
      };
    } else {
      return {
        error: true,
        statusCode: 500,
        message: error.errmsg || 'Not able to create user in service',
        errors,
      };
    }
  }
}

module.exports = UserService;
