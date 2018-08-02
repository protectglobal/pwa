const { Event } = require('../../../../models');

const events = async () => {
  try {
    return await Event.find({}).sort({ createdAt: -1 }).limit(20).exec();
  } catch (exc) {
    console.log(exc);
    return [];
  }
};

module.exports = events;
