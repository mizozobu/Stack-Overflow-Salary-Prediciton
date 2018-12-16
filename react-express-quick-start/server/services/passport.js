const passport = require('passport');
const bcrypt = require('bcrypt');
const logger = require('logger')('util/passport.js');
const models = require('models');
const User = models.User;
const LocalStrategy = require('passport-local').Strategy;

class Passport {
  constructor() {
    this.isLocalStrategySetup = false;
    this.isSerializerSetup = false;
  }

  initializePassport() {
    this.setupSerializer();
    this.setupLocalStrategy();
  }

  setupLocalStrategy() {
    if (this.isLocalStrategySetup) {
      throw new Error('LocalStrategy has already been set up');
    }

    passport.use(new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
      session: false
    },
    async(req, username, password, done) => {
      const user = await User.findOne({
        username: username,
      });

      if(!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function(err, res) {
        if (err) {
          logger.error(err);
        }

        if (res) {
          return done(null, user);
        }
        else {
          return done(null, false);
        }
      });
    }));

    logger.info('finished settting up LocalStrategy');
    this.isLocalStrategySetup = true;
  }

  resetLocalStrategy() {
    passport.unuse('local');
    logger.info('finished resetting LocalStrategy');
    this.isLocalStrategySetup = false;
  }

  setupSerializer() {
    if (this.isSerializerSetup) {
      throw new Error('serializer/deserializer has already been set up');
    }

    passport.serializeUser((user, done) => {
      done(null, user);
    });
    passport.deserializeUser((id, done) => {
      User.findById(id, (err, user) => {
        done(err, user);
      });
    });

    logger.info('finished setting up serializer and deserializer');
    this.isSerializerSetup = true;
  }
}

module.exports = new Passport();
