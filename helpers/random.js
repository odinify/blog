class RandomHelper {
  static randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}

module.exports = RandomHelper;
