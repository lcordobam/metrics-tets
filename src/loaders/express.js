'use strict';

const express = require('express');
const cors = require('cors');
const routes = require('../api');

module.exports = ({ app }) => {
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(cors());
  app.use('', routes);
};
