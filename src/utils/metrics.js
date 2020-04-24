const metrics = require('@condor-labs/metrics');
const metricsMiddleware = require('@condor-labs/metrics/src/middleware/express');
const hostname = require('os').hostname();

const { STATSD_HOST, STATSD_PORT, JOB, INSTANCE } = process.env;

const metricsConnection = () => {
  const settings = {
    host: STATSD_HOST,
    port: STATSD_PORT,
    globalTags: {
      instance: INSTANCE,
      job: JOB
    }
  };

  metrics.connect(settings);
};

module.exports = {
  metricsConnection,
  requestMiddleware: metricsMiddleware.requestMiddleware(metrics),
  errorMiddleware: metricsMiddleware.errorMiddleware(metrics),
  metrics
};
