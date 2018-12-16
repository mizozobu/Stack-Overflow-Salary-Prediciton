const ROOT_DIR =  __dirname.substr(0, __dirname.lastIndexOf('\\'));
const SERVER_DIR =  `${ROOT_DIR}\\server`;

class AppConfig {
  constructor() {
    this.PORT_DEV = '8080';
    this.ROOT_DIR = __dirname.substr(0, __dirname.lastIndexOf('\\'));
    this.STATIC_DIR = `${ROOT_DIR}\\public`;
    this.CLIENT_DIR = `${ROOT_DIR}\\client`;
    this.LOCALE_DIR = `${ROOT_DIR}\\locale`;
    this.SERVER_DIR = `${ROOT_DIR}\\server`;
    this.MODEL_DIR = `${SERVER_DIR}\\models`;
    this.ROUTE_DIR = `${SERVER_DIR}\\routes`;
    this.UTIL_DIR = `${SERVER_DIR}\\util`;
    this.SERVICE_DIR = `${SERVER_DIR}\\service`;
    this.LANG = 'en';
  }
}

module.exports = AppConfig;
