const passport = require('passport');
const { validationResult } = require('express-validator/check');
const logger = require('logger')('routes/authentication.js');
const passwordHasher = require('../util/passwordHasher');
const models = require('models');
const User = models.User;

let actions = {};
let api = {};

actions.index = async(req, res) => {
  return res.render('login');
};

actions.signin = async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(err => {
      logger.error(`${err.param}: ${err.msg}`);
    });
    //form with data
    return res.status(422).json({ errors: errors.array() });
  }

  let user;
  try {
    user = await User.create({
      username: req.body.username,
      first_name: req.body.firstname,
      last_name: req.body.lastname,
      email: req.body.email,
      password: await passwordHasher(req.body.password),
    });
  }
  catch (err) {
    logger.error(err);
    return res.render('login');
  }

  login(req, res, user);
};

actions.login = async(req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach(err => {
      logger.error(`${err.param}: ${err.msg}`);
    });
    return loginFailure(req, res);
  }

  passport.authenticate('local', (err, user) => {
    if (err) {
      // DB Error
      logger.error('Database Server Error: ', err);
      return loginFailure(req, res);
    }

    if (!user) {
      return loginFailure(req, res);
    }

    login(req, res, user);
  })(req, res, next);
};

actions.logout = async(req, res) => {
  req.logout();
  req.session.userLang = null;
  res.redirect('/login');
};

const login = (req, res, user) => {
  req.logIn(user, (err) => {
    if (err) {
      return loginFailure(req, res);
    }
    else {
      req.session.userLang = user.lang;
      req.session.overrideUserLang = false;
      return loginSuccess(req, res);
    }
  });
};

const loginSuccess = (req, res) => {
  const redirectTo = req.session.redirectTo;
  if (redirectTo) {
    req.session.redirectTo = null;
    return res.redirect(redirectTo);
  }
  else {
    return res.redirect('/');
  }
};

const loginFailure = (req, res) => {
  return res.redirect('/login');
};

module.exports = {
  actions,
  api,
};
