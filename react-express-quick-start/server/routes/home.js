const models = require('models');
const ChatMsg = models.ChatMsg;
const logger = require('logger')('routes/home.js');

let actions = {};
let api = {};

actions.index = async(req, res) => {
  return res.render('index');
};

actions.chat = async(req, res) => {
  const msgs = await ChatMsg.findAll();

  return res.render('chat', {
    msgs: JSON.stringify(msgs)
  });
};

module.exports = {
  actions,
  api,
};
