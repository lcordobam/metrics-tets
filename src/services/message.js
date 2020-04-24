'use strict';
const { metrics } = require('../utils');

var messageServices = {
  Send: async (concurrency) => {
    try {
      if (!concurrency) return 'please, send query [count]';
      for (let i = 0; i < concurrency; i++) {
        metrics.increment('MessageSend');
      }
      return 'Sent!';
    } catch (err) {
      throw err;
    }
  }
};

module.exports = messageServices;
