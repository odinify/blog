const { StatusCodes } = require('http-status-codes');
const jwt = require('jsonwebtoken');

const { secret } = require('../config');

const UserService = require('../services/user.service');

const ensureAuth = (role = 'user') => {
  return async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        error: 'This request is forbidden',
      });
    }

    try {
      const decoded = jwt.verify(token, secret.JWT);
      const user = await UserService.getUser(decoded.user, false);

      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: 'The user is unauthorized',
        });
      }

      const isAuthorized =
        user.role === 'admin' || user.role === role.toLowerCase();

      if (!isAuthorized) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          error: 'The user is unauthorized',
        });
      }

      req.user = user;
      return next();
    } catch (error) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        error: 'The user is unauthorized',
      });
    }
  };
};

module.exports = ensureAuth;
