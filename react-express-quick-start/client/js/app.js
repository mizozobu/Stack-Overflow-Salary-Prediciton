import 'bootstrap';
import '@fortawesome/fontawesome-free/js/all';
import * as scripts from './script/index'; // eslint-disable-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import { i18next, changeClientLang } from './util/i18next';
import appConfig from '../../config/app.config.client';
import Hello from './components/Hello';
import Chat from './components/Chat';
import UserList from './components/UserList';

const ComponentRenderertoId = (Component, id, propsFunc) => {
  const elem = document.getElementById(id);
  if (elem) {
    ReactDOM.render(
      <I18nextProvider i18n={i18next}>
        <Component {...propsFunc()} />
      </I18nextProvider>, elem
    );
  }
};

//staff appConfig with global data
appConfig.user = JSON.parse(document.getElementById('data').getAttribute('data-user') || '"undefined"');
appConfig.lang = document.getElementById('data').getAttribute('data-lang');
changeClientLang(appConfig.lang);

ComponentRenderertoId(Hello, 'hello', () => {
  return {
    x: 1,
    y: 2,
    z: 3,
  };
});

ComponentRenderertoId(Chat, 'chat', () => {
  const msgs = JSON.parse(document.getElementById('react-data').getAttribute('data-msgs'));
  return {
    msgs: msgs,
    appConfig: appConfig,
  };
});

ComponentRenderertoId(UserList, 'user-list', () => {
  const users = JSON.parse(document.getElementById('react-data').getAttribute('data-users'));
  return {users};
});
