const Joi = require('joi');
const validator = require('validator');

class UserValidator {
  /**
   * @property {Function} getUser - Validation schema for getting a user
   * @returns {Object} - The validation schema
   */
  static getUser() {
    const schema = Joi.object().keys({
      id: Joi.string()
        .trim()
        .required()
        .custom((value, helper) => {
          const isValid = validator.isMongoId(value);

          if (!isValid) {
            return helper.message('User id is not valid');
          }

          return true;
        }),
    });

    return schema;
  }
}

module.exports = UserValidator;
