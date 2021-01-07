const http = require('http');
const clear = require('console-clear');

class Server {
  constructor(application, PORT) {
    this.PORT = PORT;
    this.app = application.app;
    this.server = http.createServer(this.app);
  }

  start(log = true) {
    this.server.listen(this.PORT, () => {
      if (log) {
        clear(true);
        console.log(`Server running on port ${this.PORT}`);
      }
    });
  }
}

module.exports = Server;
