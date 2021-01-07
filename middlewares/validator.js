const { StatusCodes } = require('http-status-codes');

const validator = (schema, property) => {
  return (req, res, next) => {
    const validation = schema.validate(req[property]);

    if (validation.error) {
      const { message } = validation.error.details[0];

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: message,
      });
    }

    return next();
  };
};

module.exports = validator;
