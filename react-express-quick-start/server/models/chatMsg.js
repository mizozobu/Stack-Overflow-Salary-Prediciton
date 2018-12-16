const logger = require('logger')('models/chatMsg.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const schema = new mongoose.Schema({
  user: { type: ObjectId, ref: 'User', required: true, index: true },
  body: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

class ChatMsg {
  constructor() {}

  //static methods
  static async findAll() {
    const msgs = await this.find().populate('user');
    return msgs;
  }

  static async createAndPopulate(newMsg) {
    const msg = await this.create(newMsg);
    const populatedMsg = this.populate(msg, 'user');
    return populatedMsg;
  }
}

module.exports = () => {
  schema.loadClass(ChatMsg);
  return mongoose.model('ChatMsg', schema);
};
