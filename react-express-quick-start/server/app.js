require('module-alias/register');
require('dotenv').config();
const http = require('http');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const nunjucks = require('nunjucks');
const passport = require('passport');
const passportService = require('./services/passport');
const mongoose = require('mongoose');
const bs = require('browser-sync');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const i18next = require('i18next');
const i18nMiddleware = require('i18next-express-middleware');
const i18nFilesystemBackend = require('i18next-node-fs-backend');
const i18nSessionLanguage = require('./util/i18nextLanguageDetector').sessionLang;
const i18nBrowserLanguage = require('./util/i18nextLanguageDetector').browserLang;
const app = express();
const server = http.createServer(app);

const appConfig = require('appConfig');
const logger = require('logger')('app.js');
const routes = require('./routes/index');
const websocket = require('./events/index');

const isDev = (app.get('env') === 'development');

//mongoDB: run mongod
mongoose.connect(process.env.MONGODB_URL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', err => logger.error(err));

//browsersync
if (isDev) {
  bs.create().init({
    open: false,
    files: [
      `${appConfig.STATIC_DIR}/**`,
      `${appConfig.CLIENT_DIR}/templates/**`,
      `${appConfig.LOCALE_DIR}/**/translation.json`
    ],
    ghostMode: false,
    notify: false,
    reloadOnRestart: false,
    proxy: `http://localhost:${appConfig.PORT_DEV}`,
    ws: true
  });
  logger.info('Browsersync attached');
}

//favicon
app.use(favicon(path.join(appConfig.ROOT_DIR, 'favicon.ico')));

//template engine
const templatePath = path.join(appConfig.CLIENT_DIR, 'templates');
app.set('view engine', 'html');
nunjucks.configure(templatePath, {
  autoescape: true,
  express: app,
  noCache: isDev,
});

//log
if (isDev) {
  app.use(morgan('dev', {
    skip: req => req.originalUrl.match(/.css|.js|.json|.png|.jpg|.gif$/)
  }));
}

//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: db }),
}));

//middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/styles', express.static(path.join(appConfig.STATIC_DIR, 'styles')));
app.use('/js', express.static(path.join(appConfig.STATIC_DIR, 'js')));
app.use('/media', express.static(path.join(appConfig.STATIC_DIR, 'media')));

//passport
passportService.initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//i18next
const lngDetector = new i18nMiddleware.LanguageDetector();
lngDetector.addDetector(i18nBrowserLanguage);
lngDetector.addDetector(i18nSessionLanguage);

i18next
  .use(lngDetector)
  .use(i18nFilesystemBackend)
  .init({
    fallbackLng: [appConfig.LANG],
    whitelist: ['en', 'ja'],
    backend: {
      loadPath: `${appConfig.LOCALE_DIR}/{{lng}}/translation.json`,
    },
    detection: {
      order: ['sessionLang', 'browserLang']
    }
  });
app.use(i18nMiddleware.handle(i18next));

//routes
routes(app);

//websocket
appConfig.initializeWebSocket(server);
appConfig.IO.on('connection', socket => {
  websocket(socket);
});

if (isDev) {
  server.listen(appConfig.PORT_DEV);
}
else {
  server.listen(3000);
}
