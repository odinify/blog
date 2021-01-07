const { StatusCodes } = require('http-status-codes');

const UserService = require('../services/user.service');
const Errors = require('../errors');

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      return res.status(StatusCodes.OK).json({
        success: true,
        users,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: errorMessage || Errors.getDefault,
      });
    }
  }

  static async getUser(req, res) {
    const id = req.params.id.trim();
    const isAuthorized =
      req.user._id.toString() === id || req.user.role === 'admin';

    if (!isAuthorized) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'This user is not authorized',
      });
    }

    const user = await UserService.getUser(id);

    return res.status(StatusCodes.OK).json({
      success: true,
      user,
    });
  }
}

module.exports = UserController;
