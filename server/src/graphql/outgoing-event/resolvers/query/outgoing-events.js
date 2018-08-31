const { OutgoingEvent } = require('../../../../models');

const outgoingEvents = async () => {
  try {
    return await OutgoingEvent.find({}).sort({ createdAt: -1 }).limit(20).exec();
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = outgoingEvents;
