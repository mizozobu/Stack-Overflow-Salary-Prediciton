import io from 'socket.io-client';
const AppConfig = require('./app.config');

class ClientConfig extends AppConfig {
  constructor() {
    super();
    this.SOCKET = io.connect(`${location.protocol}//${location.host}`);
  }
}

module.exports = new ClientConfig();
