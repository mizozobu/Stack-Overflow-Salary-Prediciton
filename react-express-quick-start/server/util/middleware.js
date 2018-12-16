const appConfig = require('appConfig');
const logger = require('logger')('util/middleware.js');

let middlewares = {};

middlewares.isAuthenticated = async(req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    req.session.redirectTo = req.originalUrl;
    res.redirect('/login');
  }
};

middlewares.isAdmin = async(req, res, next) => {
  if (req._passport.session.user.admin) {
    return next();
  }
  else {
    res.redirect('/');
  }
};

middlewares.verifyCsrf = async(req, res, next) => {
  const token = req.body.csrf || req.query.csrf || req.params.csrf || null;
  const key = req.session.id || appConfig.CSRF_KEY;

  if (appConfig.CSRF.verify(key, token)) {
    return next();
  }

  return res.sendStatus(403);
};

middlewares.renderData = async(req, res, next) => {
  let renderData = {};

  renderData.lang = req.i18n.language;
  renderData.user = JSON.stringify(req.user);

  const secret = req.session.id || appConfig.CSRF_KEY;
  renderData.csrf = appConfig.CSRF.create(secret);

  res.locals = Object.assign(renderData, res.locals);
  next();
};

module.exports = middlewares;
