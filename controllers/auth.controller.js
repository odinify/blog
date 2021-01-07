const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');
const Errors = require('../errors');

class AuthController {
  static async register(req, res) {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password.trim();
    const phoneNumber = req.body.phoneNumber.trim().toLowerCase();
    const name = req.body.name.trim();
    const role = 'user';

    try {
      await UserService.createUser(username, password, phoneNumber, name, role);
      return res.status(StatusCodes.CREATED).json({
        success: true,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }

  static async login(req, res) {
    const username = req.body.username.trim().toLowerCase();
    const password = req.body.password.trim();

    try {
      const { token, user } = await AuthService.login(username, password);
      return res.status(StatusCodes.OK).json({
        success: true,
        token,
        user,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }
}

module.exports = AuthController;
