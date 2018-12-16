const AppConfig = require('./app.config');

class ServerConfig extends AppConfig {
  constructor() {
    super();
  }
}

module.exports = new ServerConfig();
