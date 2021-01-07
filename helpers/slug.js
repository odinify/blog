const RandomHelper = require('./random');

class SlugHelper {
  static createSlug(text) {
    const randomNumber = RandomHelper.randomNumber(10000, 99999);
    const slug = text
      .trim()
      .toLowerCase()
      .replace(/[*+~.()'"!:@$#]/g, '')
      .replace(/\s\s+/g, ' ')
      .split(' ')
      .join('-');

    return `${slug}-${randomNumber}`;
  }
}

module.exports = SlugHelper;
