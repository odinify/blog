const { StatusCodes } = require('http-status-codes');

const PostService = require('../services/post.service');
const Errors = require('../errors');

class PostController {
  static async createPost(req, res) {
    const title = req.body.title.trim();
    const summary = req.body.summary.trim();
    const markdown = req.body.markdown.trim();
    const authorID = req.user._id;

    try {
      const newPost = await PostService.createPost(
        title,
        summary,
        markdown,
        authorID
      );

      return res.status(StatusCodes.CREATED).json({
        success: true,
        slug: newPost.slug,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }

  static async getPost(req, res) {
    const slug = req.params.slug.trim();

    try {
      const post = await PostService.getPost(slug);

      return res.status(StatusCodes.OK).json({
        success: true,
        post,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }

  static async updatePost(req, res) {
    const slug = req.params.slug.trim();
    const title = req.body.title && req.body.title.trim();
    const summary = req.body.summary && req.body.summary.trim();
    const markdown = req.body.markdown && req.body.markdown.tirm();

    try {
      await PostService.updatePost(slug, title, summary, markdown);

      return res.status(StatusCodes.OK).json({
        success: true,
        post: {
          slug,
        },
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }

  static async getAllPosts(req, res) {
    try {
      const posts = await PostService.getAllPosts();

      return res.status(StatusCodes.OK).json({
        success: true,
        posts,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.SERVICE_UNAVAILABLE).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }

  static async getPostMarkdown(req, res) {
    const slug = req.params.slug.trim();

    try {
      const post = await PostService.getPostMarkdown(slug);

      return res.status(StatusCodes.OK).json({
        success: true,
        post,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }

  static async deletePost(req, res) {
    const slug = req.params.slug.trim();

    try {
      await PostService.deletePost(slug);

      return res.status(StatusCodes.OK).json({
        success: true,
      });
    } catch (error) {
      const errorMessage = Errors.getMessage(error.message);

      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        error: errorMessage || Errors.getDefault(),
      });
    }
  }
}

module.exports = PostController;
