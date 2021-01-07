const Joi = require('joi');

class PostValidator {
  /**
   * @property {Function} createPost - Validation shema for creating a post
   * @returns {Object} - The validation schema
   */
  static createPost() {
    const schema = Joi.object().keys({
      title: Joi.string().trim().required(),
      summary: Joi.string().trim().required(),
      markdown: Joi.string().trim().required(),
    });

    return schema;
  }

  /**
   * @property {Function} getPost - Validation schema for getting a post
   * @returns {Object} - The validation schema
   */
  static getPost() {
    const schema = Joi.object().keys({
      slug: Joi.string().trim().required(),
    });

    return schema;
  }

  /**
   * @property {Function} updatePostParams - Validation schema for post update params
   * @returns {Object} - The validation schema
   */
  static updatePostParams() {
    const schema = Joi.object().keys({
      slug: Joi.string().trim().required(),
    });

    return schema;
  }

  /**
   * @property {Function} updatePost - Validation schema for updating a post
   * @returns {Object} - The validation schema
   */
  static updatePost() {
    const schema = Joi.object().keys({
      title: Joi.string().trim(),
      summary: Joi.string().trim(),
      markdown: Joi.string().trim(),
    });

    return schema;
  }

  /**
   * @property {Function} getPostMarkdown - Validation schema for getting a post markdown
   * @returns {Object} - The validation schema
   */
  static getPostMarkdown() {
    const schema = Joi.object().keys({
      slug: Joi.string().trim().required(),
    });

    return schema;
  }

  /**
   * @property {Function} deletePost - Validation schema for deleting a post
   * @returns {Object} - The validation schema
   */
  static deletePost() {
    const schema = Joi.object().keys({
      slug: Joi.string().trim().required(),
    });

    return schema;
  }
}

module.exports = PostValidator;
