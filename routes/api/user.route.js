const express = require('express');

const UserController = require('../../controllers/user.controller');
const UserValidator = require('../../validators/user');

const ensureAuth = require('../../middlewares/ensureAuth');
const validator = require('../../middlewares/validator');

const router = express.Router();

router.get('/', ensureAuth('admin'), UserController.getAllUsers);
router.get(
  '/:id',
  ensureAuth('user'),
  validator(UserValidator.getUser(), 'params'),
  UserController.getUser
);

module.exports = router;
