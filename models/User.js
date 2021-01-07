const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    validate: {
      validator: validator.isAlphanumeric,
      message: 'Username must be alphanumeric',
    },
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: value => validator.isMobilePhone(value, 'fa-IR'),
      message: 'Phone number must be valid',
    },
  },
  name: {
    type: String,
    required: true,
    validate: {
      validator: value => {
        const valueWithoutSpace = value.split(' ').join('');
        return validator.isAlpha(valueWithoutSpace, 'fa-IR');
      },
      message: 'Name is not valid',
    },
  },
  role: {
    type: String,
    lowercase: true,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createdAp: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
