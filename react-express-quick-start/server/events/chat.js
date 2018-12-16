const models = require('models');
const ChatMsg = models.ChatMsg;
const appConfig = require('appConfig');

module.exports = socket => {
  let events = {};

  events.addTyper = socket.on('typerAdd', typer => {
    socket.broadcast.emit('typerAdd', typer);
  });

  events.removeTyper = socket.on('typerRemove', typer => {
    socket.broadcast.emit('typerRemove', typer);
  });

  events.chat = socket.on('chatAdd', async(msg) => {
    const newMsg = await ChatMsg.createAndPopulate(msg);

    appConfig.IO.sockets.emit('chatAdd', newMsg);
  });

  return events;
};
