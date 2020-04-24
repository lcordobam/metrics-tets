require('dotenv').config('./');
const express = require('express');
const app = express();

const metrics = require('@condor-labs/metrics');
const metricsMiddleware = require('@condor-labs/metrics/src/middleware/express');

const { STATSD_HOST, STATSD_PORT, JOB, INSTANCE } = process.env;

metrics.connect({
  host: STATSD_HOST,
  port: STATSD_PORT,
  globalTags: {
    job: JOB,
    instance: INSTANCE
  }
});

const { PORT = 3000 } = process.env;

// Uncomment the following code to log errors from the library
metrics.socket.on('error', (error) => {
  console.error('Error in socket: ', error.message);
});

// Middleware to count the number of request and the duration of the requests
app.use(metricsMiddleware.requestMiddleware(metrics));

// Your routes should be after you setup the requestMiddleware and before the errorMiddleware
app.get('/', (req, res) => {
  metrics.increment('hr_test_request');
  res.send('Sent');
});

app.use(metricsMiddleware.errorMiddleware(metrics));

app.listen(PORT, () => {
  metrics.heartbeatSignal();
  metrics.restartSignal();
  metrics.collectAppInformation();
  // metrics.collectSystemInformation();
  console.log(`API running on port ${PORT}`); //eslint-disable-line
});

process.on('SIGINT', function () {
  console.log('\nCaught interrupt signal'); //eslint-disable-line
  metrics.closeConnection(); // Close statsd connection
  process.exit();
});
