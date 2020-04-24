'use strict';
const { Router } = require('express');
const message = require('./routes/message');

const app = Router();
message(app);

module.exports = app;
