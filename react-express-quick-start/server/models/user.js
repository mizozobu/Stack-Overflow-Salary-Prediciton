const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  lang: { type: String },
  status: { type: Boolean, default: 1 },
  admin: { type: Boolean, default: 0 },
});

const status = {
  active: 1,
  inactive: 0,
};

const admin = {
  admin: 1,
  nonAdmin: 0,
};

class User {
  constructor() {}

  //static methods
  static async findAll() {
    const users = await this.find();

    return users;
  }

  //instance methods
  async isActive() {
    return this.status === status.active;
  }

  async activate() {
    this.status = status.active;
    this.save();
  }

  async deactivate() {
    this.status = status.inactive;
    this.save();
  }

  async isAdmin() {
    return this.admin === admin.admin;
  }

  async adminize() {
    this.admin = admin.admin;
    this.save();
  }

  async unadminize() {
    this.admin = admin.nonAdmin;
    this.save();
  }
}

module.exports = () => {
  schema.loadClass(User);
  return mongoose.model('User', schema);
};
