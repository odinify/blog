const dotenv = require('dotenv');
const path = require('path');

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

const serverConfig = require('./server');
const mongoConfig = require('./mongo');
const secretConfig = require('./secret');

module.exports = {
  language: process.env.LANGUAGE || 'EN',
  server: serverConfig,
  mongo: mongoConfig,
  secret: secretConfig,
};
