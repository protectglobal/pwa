const postEvent = require('./post-event');
const clearEvents = require('./clear-events');

const Mutation = {
  postEvent,
  clearEvents,
};

module.exports = Mutation;
