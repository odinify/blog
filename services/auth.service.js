const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserModel = require('../models/User');

const { secret } = require('../config');

class AuthService {
  static async login(username, password) {
    const errorCode = 'WRONG_CREDENTIALS';
    const user = await UserModel.findOne({ username });

    if (!user) {
      throw new Error(errorCode);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error(errorCode);
    }

    const token = jwt.sign({ user: user._id }, secret.JWT);
    const normalizedUser = {
      id: user._id,
      username: user.username,
      name: user.name,
      admin: user.role === 'admin',
    };

    return {
      user: normalizedUser,
      token,
    };
  }
}

module.exports = AuthService;
