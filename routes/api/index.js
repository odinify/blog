const express = require('express');

const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const postRoute = require('./post.route');

class APIRouter {
  static registerRoutes(app) {
    const router = express.Router();
    router.use('/auth', authRoute);
    router.use('/users', userRoute);
    router.use('/posts', postRoute);

    app.use('/api', router);
  }
}

module.exports = APIRouter;
