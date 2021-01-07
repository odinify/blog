const inquirer = require('inquirer');
const chalk = require('chalk');
const validator = require('validator');
const mongoose = require('mongoose');

const Database = require('../../database');
const UserService = require('../../services/user.service');
const Errors = require('../../errors');

const { mongo: mongoConfig } = require('../../config');

const database = new Database(mongoConfig.URI);

database.connect(false);

const createUser = () => {
  const questions = [
    {
      name: 'username',
      type: 'input',
      message: 'Please enter your username',
      validate: value => {
        const isValid = validator.isAlphanumeric(value.trim());

        if (!isValid) {
          return 'Username is not valid';
        }

        return true;
      },
    },
    {
      name: 'password',
      type: 'password',
      message: 'Please enter your password',
      validate: value => {
        if (value.trim().length < 8) {
          return 'Password must be at least 8 characters';
        }

        return true;
      },
    },
    {
      name: 'phoneNumber',
      type: 'input',
      message: 'Please enter your phone number',
      validate: value => {
        const isValid = validator.isMobilePhone(value.trim(), 'fa-IR');

        if (!isValid) {
          return 'Phone number must be valid';
        }

        return true;
      },
    },
    {
      name: 'role',
      type: 'list',
      message: 'Please select the role',
      choices: ['User', 'Admin'],
      default: 'User',
    },
  ];

  inquirer
    .prompt(questions)
    .then(async answers => {
      const username = answers.username.trim().toLowerCase();
      const password = answers.password.trim();
      const phoneNumber = answers.phoneNumber.trim();
      const role = answers.role.toLowerCase();
      let name;

      if (role === 'admin') name = 'مدیر';
      else name = 'کاربر';

      try {
        await UserService.createUser(
          username,
          password,
          phoneNumber,
          name,
          role
        );

        console.log(
          `${chalk.greenBright('SUCCESS')} Created user successfully.`
        );
      } catch (error) {
        const errorMessage =
          Errors.getMessage(error.message, 'EN') || Errors.getDefault('EN');

        console.log(`${chalk.redBright('ERROR')} ${errorMessage}`);
      }

      mongoose.connection.close();
    })
    .catch(error => console.log(`Error: ${error}`));
};

module.exports = createUser;
