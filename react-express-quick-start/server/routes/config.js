const logger = require('logger')('routes/config.js');

let actions = {};
let api = {};

actions.changeLang = async(req, res) => {
  req.session.clientLang = req.params.lang;
  req.session.overrideUserLang = true;
  res.redirect(req.query.redirect);
};

module.exports = {
  actions,
  api,
};
