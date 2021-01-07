const express = require('express');

const validator = require('../../middlewares/validator');

const AuthController = require('../../controllers/auth.controller');
const AuthValidator = require('../../validators/auth');

const router = express.Router();

router.post(
  '/register',
  validator(AuthValidator.register(), 'body'),
  AuthController.register
);

router.post(
  '/login',
  validator(AuthValidator.login(), 'body'),
  AuthController.login
);

module.exports = router;
