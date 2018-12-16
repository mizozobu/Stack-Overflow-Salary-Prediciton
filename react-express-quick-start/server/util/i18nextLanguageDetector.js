const browserLang = {
  name: 'browserLang',

  lookup: (req, res, options) => {
    // options -> are passed in options
    return req.acceptsLanguages()[0] || null;
  },

  cacheUserLanguage: (req, res, lng, options) => {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage

    // store it
  }
};


const sessionLang = {
  name: 'sessionLang',

  lookup: (req, res, options) => {
    // options -> are passed in options
    if (req.session.overrideUserLang) {
      return req.session.clientLang || null;
    }
    return req.session.userLang || req.session.clientLang || null;
  },

  cacheUserLanguage: (req, res, lng, options) => {
    // options -> are passed in options
    // lng -> current language, will be called after init and on changeLanguage

    // store it
  }
};

module.exports = {
  sessionLang,
  browserLang,
};
