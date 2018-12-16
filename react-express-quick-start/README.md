# MERN++

### MERN Stack
- MongoDB
- Express.js
- React.js
- Node.js

### Other Features
- `Nunjucks` as template engine
- Auto restart with `nodemon`
- Auto Reloader with `browsersync`
- Authentication with `passport`
- Password hashing with `bcrypt`
- Login guard
- Admin guard
- csrf verification with `csrf`
- Logging with `morgan` and `eazy-logger`
- Form validation with `express-validator`
- Session with `express-session`
- Multi-Lanugage with `i18next` and `react-i18next`
- Websocket with `socket.io` and `socket.io-client`
- Webpack4
- Bootstrap4
- Override bootstrap by `client/styles/bootstrap_override/_custom.scss`
- Font Awesome
- `animate.css`
- eslint
- editorconfig
- VSCode Debugger

### Quick Start
```
git clone https://gitlab.com/mizozobu/react-express-quick-start.git
```
```
yarn
```
```
docker-compose up
```
```
npm run build
```
```
npm run server
```
It should be up at http://localhost:3000

### Usage
#### Auto Reload
Browser reloads after you make any changes in `/clinet` and `locale/{{lang}}/translation.json` if you keep `npm run build` running.

#### Auto Restart
Server restarts after you make any changes in `/server`.

#### Multi-Language
In `locale/{{lang}}/translation.json`
```
{
  "key": "value"
}
```
In html files,
```
{{ t('key') }}
```
In react component,
```
{ t('test') }
```

#### SSR vs CRS
- SSR - use `Nunjucks`
- CRS - use `React.js`

> render stringified data with `Nunjucks`, and read & parse the data to use in `React.js`

> placeholding loader can be shown until React component gets rendered, use
> ```
> @include loader($wisth, $height);
> ```

If you want to SSR React, check out https://github.com/zeit/next.js/

#### MongoDB
Access http://localhost:8081 to peek the databse
- username: admin
- password: password

#### Debugger(for VSCode)
1. `Ctrl + Shift + D` (or just click debug icon)
2. Choose an option

### Configuration
Add `.env` in the root directory, and add ENVIROMENT VARIABLEs.

### Sample `.env` file
```
NODE_ENV = 'development'
MONGODB_URL = 'mongodb://127.0.0.1/db_name'
SESSION_NAME = 'session_name'
SESSION_SECRET = 'session_secret'
```
