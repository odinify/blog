const express = require('express');

const PostController = require('../../controllers/post.controller');
const PostValidator = require('../../validators/post');
const validator = require('../../middlewares/validator');
const ensureAuth = require('../../middlewares/ensureAuth');

const router = express.Router();

router.post(
  '/',
  ensureAuth('admin'),
  validator(PostValidator.createPost(), 'body'),
  PostController.createPost
);

router.get('/', PostController.getAllPosts);

router.get(
  '/:slug',
  validator(PostValidator.getPost(), 'params'),
  PostController.getPost
);

router.get(
  '/:slug/markdown',
  validator(PostValidator.getPostMarkdown(), 'params'),
  ensureAuth('admin'),
  PostController.getPostMarkdown
);

router.put(
  '/:slug',
  ensureAuth('admin'),
  validator(PostValidator.updatePostParams(), 'params'),
  validator(PostValidator.updatePost(), 'body'),
  PostController.updatePost
);

router.delete(
  '/:slug',
  ensureAuth('admin'),
  validator(PostValidator.deletePost(), 'params'),
  PostController.deletePost
);

module.exports = router;
