module.exports = app => {
  const home = require('./home');

  app.get('/', home.actions.index);
  app.get('/predict', home.actions.predict);
  app.post('/_api/predict', home.api.predict);
  app.get('/recommend', home.actions.recommend);
  app.post('/_api/recommend', home.api.recommend);
};
