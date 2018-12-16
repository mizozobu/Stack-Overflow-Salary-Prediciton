const IO = require('socket.io');
const csrf = require('csrf');
const randomstring = require('randomstring');
const AppConfig = require('./app.config');

class ServerConfig extends AppConfig {
  constructor() {
    super();
    this.CSRF = new csrf();
    this.CSRF_KEY = randomstring.generate(32);
    this.IO = undefined;
  }

  async initializeWebSocket(server) {
    this.IO = new IO(server);
  }
}

module.exports = new ServerConfig();
