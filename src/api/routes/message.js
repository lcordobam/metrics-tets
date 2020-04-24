'use strict';

const { messageServices } = require('../../services');

module.exports = (route) => {
  route.get('/Message', async (req, res) => {
    try {
      const response = await messageServices.Send(req.query.count);
      res.send(response);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
};
