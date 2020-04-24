const expressLoaders = require('./express');
require('./metrics');

module.exports = async ({ expressApp }) => {
  await expressLoaders({ app: expressApp });
};
