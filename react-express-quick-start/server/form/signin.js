const { body } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

module.exports = [
  body('username').trim(),
  body('firstname').trim(),
  body('lastname').trim(),
  body('email', 'must be email').isEmail().trim(),
  body('password', 'must be more than 8 characters').isLength({ min: 8 }).trim(),
];
