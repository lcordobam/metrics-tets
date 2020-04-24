'use strict';
require('dotenv').config('../');
const express = require('express');
const { metrics } = require('./utils');

const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 7027;
  await require('./loaders')({ expressApp: app });
  app.listen(port, () => {
    //metrics.implementFullMonitoring();
    metrics.heartbeatSignal();
    metrics.restartSignal();
    metrics.collectAppInformation();
    console.log(`🛡️  Server listening on port: ${port} 🛡️`);
  });
};

module.exports = { startServer };
