const path = require('path');

class AppConfig {
  constructor() {
    this.PORT_DEV = '8080';
    this.ROOT_DIR = path.resolve(__dirname, '..');
    this.STATIC_DIR = path.join(this.ROOT_DIR, 'public');
    this.CLIENT_DIR = path.join(this.ROOT_DIR, 'client');
    this.LOCALE_DIR = path.join(this.ROOT_DIR, 'locale');
    this.SERVER_DIR = path.join(this.ROOT_DIR, 'server');
    this.MODEL_DIR = path.join(this.SERVER_DIR, 'models');
    this.ROUTE_DIR = path.join(this.SERVER_DIR, 'routes');
    this.SERVICE_DIR = path.join(this.SERVER_DIR, 'services');
    this.LANGUAGE = 'en';
  }
}

module.exports = AppConfig;
