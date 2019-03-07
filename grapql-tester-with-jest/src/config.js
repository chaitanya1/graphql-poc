const path = require('path');

const config = {
  // Local dir config
  SRC_DIR: path.join(__dirname, 'client', 'src'),
  // App server config
  APP_PORT: 3000,
  APP_URL: 'https://api.dev.{userdomain.com}',
  GQL_URL_DIR: 'graphql',
//overall url looks like api.dev.example.com/graphql
};

module.exports = config;
