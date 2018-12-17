require('module-alias/register');
require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const nunjucks = require('nunjucks');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const server = http.createServer(app);

const appConfig = require('appConfig');
const logger = require('logger')('app.js');
const routes = require('./routes/index');

const isDev = (app.get('env') === 'development');

//browsersync
if (isDev) {
  const bs = require('browser-sync');
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

//middleware
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/styles', express.static(path.join(appConfig.STATIC_DIR, 'styles')));
app.use('/js', express.static(path.join(appConfig.STATIC_DIR, 'js')));
app.use('/media', express.static(path.join(appConfig.STATIC_DIR, 'media')));

//routes
routes(app);

if (isDev) {
  server.listen(appConfig.PORT_DEV);
}
else {
  server.listen(process.env.PORT || 3000);
}
