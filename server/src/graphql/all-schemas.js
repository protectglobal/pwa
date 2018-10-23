const Base = require('./base');
const User = require('./user');
const Subscription = require('./subscription');
const IncomingEvent = require('./incoming-event');
const OutgoingEvent = require('./outgoing-event');

// Add all your schemas here!
const allSchemas = {
  Base,
  User,
  Subscription,
  IncomingEvent,
  OutgoingEvent,
};

module.exports = allSchemas;
