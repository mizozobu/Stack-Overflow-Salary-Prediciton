const eazyLogger  = require('eazy-logger').Logger();

class LoggerService {
  constructor(logger, prefix) {
    this.logger = logger;
    this.prefix = prefix;
  }

  debug(message) {
    return this.logger.info('{yellow:[debug][%s]} %s', this.prefix, message);
  }

  info(message) {
    return this.logger.info('{green:[info][%s]} %s', this.prefix, message);
  }

  error(message) {
    return this.logger.error('{red:[error][%s]} %s', this.prefix, message);
  }}

module.exports = prefix => {
  return new LoggerService(eazyLogger, prefix);
};
