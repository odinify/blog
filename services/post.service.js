const mongoose = require('mongoose');
const marked = require('marked');
const { JSDOM } = require('jsdom');
const createDOMPurify = require('dompurify');

const PostModel = require('../models/Post');
const SlugHelper = require('../helpers/slug');

const { window } = new JSDOM('');
const DOMPurify = createDOMPurify(window);

class PostService {
  static async createPost(title, summary, markdown, authorID) {
    const id = mongoose.Types.ObjectId(authorID);
    const html = marked(markdown);
    const sanitizedHTML = DOMPurify.sanitize(html);

    let slug = SlugHelper.createSlug(title);

    while (true) {
      const slugExists = await PostModel.findOne({ slug });

      if (slugExists) {
        slug = SlugHelper.createSlug(title);
        continue;
      }

      break;
    }

    const newPost = new PostModel({
      title,
      slug,
      summary,
      content: {
        markdown,
        HTML: sanitizedHTML,
      },
      author: id,
    });

    return newPost.save();
  }

  static async getPost(slug) {
    const post = await PostModel.findOne({ slug }).populate('author');

    if (!post) {
      throw new Error('POST_DOES_NOT_EXIST');
    }

    const normalizedPost = {
      title: post.title,
      summary: post.summary,
      html: post.content.HTML,
      createdAt: post.createAt,
      author: {
        name: post.author.name,
        username: post.author.username,
      },
    };

    return normalizedPost;
  }

  static async getAllPosts() {
    const posts = await PostModel.find({}).populate('author');
    const normalized = posts.map(post => {
      return {
        title: post.title,
        summary: post.summary,
        createdAt: post.createdAt,
        slug: post.slug,
        author: {
          name: post.author.name,
          username: post.author.username,
        },
      };
    });

    return normalized;
  }

  static async updatePost(slug, title, summary, markdown) {
    const post = await PostModel.findOne({ slug });

    if (!post) {
      throw new Error('POST_DOES_NOT_EXIST');
    }

    const isModified =
      post.title !== title ||
      post.summary !== summary ||
      post.content.markdown !== markdown;

    post.title = title || post.title;
    post.summary = summary || post.summary;
    post.content.markdown = markdown || post.content.markdown;
    post.content.HTML = markdown
      ? DOMPurify.sanitize(marked(markdown))
      : post.content.HTML;
    post.updatedAt = isModified ? Date.now() : post.updatedAt;

    return post.save();
  }

  static async getPostMarkdown(slug) {
    const post = await PostModel.findOne({ slug }).populate('author');

    if (!post) {
      throw new Error('POST_DOES_NOT_EXIST');
    }

    const normalizedPost = {
      title: post.title,
      summary: post.summary,
      markdown: post.content.markdown,
      author: {
        name: post.author.name,
        username: post.author.username,
      },
    };

    return normalizedPost;
  }

  static async deletePost(slug) {
    const postExists = await PostModel.findOne({ slug });

    if (!postExists) {
      throw new Error('POST_DOES_NOT_EXIST');
    }

    return PostModel.deleteOne({ slug });
  }
}

module.exports = PostService;
