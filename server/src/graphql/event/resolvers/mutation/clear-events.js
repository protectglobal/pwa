const { Event } = require('../../../../models');

const clearEvents = async () => {
  try {
    await Event.remove({});
    return { status: 200 };
  } catch (exc) {
    console.log(exc);
    return { status: 500 };
  }
};

module.exports = clearEvents;
