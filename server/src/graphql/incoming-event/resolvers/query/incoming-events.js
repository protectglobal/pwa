const { IncomingEvent } = require('../../../../models');

const incomingEvents = async () => {
  try {
    return await IncomingEvent.find({}).sort({ createdAt: -1 }).limit(20).exec();
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = incomingEvents;
