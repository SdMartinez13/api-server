'use strict';

const { sequelize } = require('./src/models');
const server = require('./src/app');

sequelize.sync()
  .then(() => {
    console.log('Successful Connection!');
  })
  .catch(err => console.error(err));

server.start();
