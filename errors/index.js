const { errors } = require('./errors.json');
const { language } = require('../config');

class Errors {
  static getMessage(errorCode, lang) {
    const useLanguage = lang || language;

    if (errors[errorCode]) {
      return errors[errorCode].message[useLanguage.toUpperCase()];
    }

    return null;
  }

  static getDefault(lang) {
    const useLanguage = lang || language;
    return errors.DEFAULT.message[useLanguage];
  }
}

module.exports = Errors;
