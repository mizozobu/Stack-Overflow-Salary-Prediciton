module.exports = app => {
  const home = require('./home');
  const config = require('./config');
  const authentication = require('./authentication');
  const admin = require('./admin/index');
  const form = require('../form/index');
  const middleware = require('../util/middleware');
  const isAuthenticated = middleware.isAuthenticated;
  const isAdmin = middleware.isAdmin;
  const verifyCsrf = middleware.verifyCsrf;
  const renderData = middleware.renderData;

  //api
  // app.get('/_api/...', ...);

  app.use(renderData);

  //actions
  app.get('/', home.actions.index);
  app.get('/login', authentication.actions.index);
  app.post('/login', verifyCsrf, authentication.actions.login);
  app.post('/signin', verifyCsrf, form.signin, authentication.actions.signin);
  app.get('/logout', authentication.actions.logout);

  app.get('/_api/config/language/:lang', config.actions.changeLang);

  app.use(isAuthenticated);

  app.get('/chat', home.actions.chat);

  app.use(isAdmin);

  app.get('/admin/user', admin.user.actions.index);
  app.get('/_api/admin/user/adminize', admin.user.actions.adminize);
  app.get('/_api/admin/user/unadminize', admin.user.actions.unadminize);
};
