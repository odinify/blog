const mongoose = require('mongoose');

class Database {
  constructor(URI) {
    this.URI = URI;
  }

  connect(log = true) {
    mongoose
      .connect(this.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => log && console.log('Connected to the database.'))
      .catch(() => log && console.log('Failed to connect to the database.'));
  }
}

module.exports = Database;
