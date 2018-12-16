const appConfig = require('appConfig');
const logger = require('logger')('routes/admin/user.js');
const models = require('models');
const User = models.User;
let actions = {};
let api = {};

actions.index = async(req, res) => {
  const users = await User.find();
  return res.render('admin/user', {
    users: JSON.stringify(users)
  });
};

actions.adminize = async(req, res) => {
  const users = await User.find();
  users[0].adminize();

  return res.redirect('/admin/user');
};

actions.unadminize = async(req, res) => {
  const users = await User.find();
  users[0].unadminize();

  return res.redirect('/admin/user');
};

module.exports = {
  actions,
  api,
};
