const { Event } = require('./models');

// Clear DB
const clearAll = async () => {
  await Event.remove({});
};

const initDB = async () => {
  // Clear Author and Post collections
  // await clearAll();
};

module.exports = initDB;
