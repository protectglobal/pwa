const { Event } = require('../../../../models');

const clearEvents = async () => {
  try {
    await Event.deleteMany({});
    return { status: 200 };
  } catch (exc) {
    console.log(exc);
    return { status: 500 };
  }
};

module.exports = clearEvents;
