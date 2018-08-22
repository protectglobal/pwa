const Base = require('./base');
const User = require('./user');
const PassCode = require('./pass-code');
const Subscription = require('./subscription');
const Event = require('./event');

// Add all your schemas here!
const allSchemas = {
  Base,
  User,
  PassCode,
  Subscription,
  Event,
};

module.exports = allSchemas;
