const AppConfig = require('./app.config');

class ClientConfig extends AppConfig {
  constructor() {
    super();
  }
}

module.exports = new ClientConfig();
