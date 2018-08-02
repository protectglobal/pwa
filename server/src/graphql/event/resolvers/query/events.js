const { Event } = require('../../../../models');

const events = async () => {
  try {
    // TODO: shall we use .exec() at the end of the query?
    const events = await Event.find({}).sort({ createdAt: -1 }).limit(20);
    console.log('events', events);
    return events;
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = events;
