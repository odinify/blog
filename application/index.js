const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');

const Router = require('../routes');

class Application {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
  }

  setupMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(mongoSanitize());
  }

  setupRoutes() {
    Router.registerRoutes(this.app);
  }
}

module.exports = Application;
