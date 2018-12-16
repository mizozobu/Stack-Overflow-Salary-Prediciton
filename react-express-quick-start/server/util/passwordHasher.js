const bcrypt = require('bcrypt');
const logger = require('logger')('util/passwordHasher.js');
const saltRounds = 14;

module.exports = password => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          logger.error('Password hashing error: ', err);
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};
