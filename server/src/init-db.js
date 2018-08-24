const { User, Event } = require('./models');

// Clear DB
const clearAll = async () => {
  // await Event.deleteMany({});
  await User.deleteMany({});
};

// Populate DB.
const fixtures = async () => {
  const user = await User.findOne({}).exec();

  // Insert a user in case users collection is empty
  if (user) {
    console.log('\nTest user already exists!');
    return;
  }

  // Insert test user
  const firstUser = new User({
    email: 'federodes@gmail.com',
  });

  try {
    await firstUser.save();
    console.log('\nFirst user inserted!');
  } catch (exc) {
    console.log(exc);
  }
};

const initDB = async () => {
  // Clear Author and Post collections
  await clearAll();
  // Set some initial data
  await fixtures();
};

module.exports = initDB;
