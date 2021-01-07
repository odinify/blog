const Joi = require('joi');
const validator = require('validator');

class AuthValidator {
  /**
   * @property {Function} register - Validation schema for register
   * @returns {Object} - The validation schema
   */
  static register() {
    const schema = Joi.object().keys({
      username: Joi.string().trim().alphanum().required(),
      password: Joi.string().trim().min(8).required(),
      phoneNumber: Joi.string()
        .trim()
        .required()
        .custom((value, helper) => {
          const isValid = validator.isMobilePhone(value, 'fa-IR');

          if (!isValid) {
            return helper.message('Phone number must be valid');
          }

          return true;
        }),
      name: Joi.string()
        .trim()
        .required()
        .custom((value, helper) => {
          const valueWithoutSpace = value.split(' ').join('');
          const isValid = validator.isAlpha(valueWithoutSpace, 'fa-IR');

          if (!isValid) {
            return helper.message('Name is not valid.');
          }

          return true;
        }),
    });

    return schema;
  }

  /**
   * @property {Fucntion} login - Validation schema for login
   * @returns {Object} - The validation schema
   */
  static login() {
    const schema = Joi.object().keys({
      username: Joi.string().trim().alphanum().required(),
      password: Joi.string().trim().required(),
    });

    return schema;
  }
}

module.exports = AuthValidator;
