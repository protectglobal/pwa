const { User } = require('../../../../models');

const user = async (root, args, context) => {
  console.log('\n\nCONTEXT', context);
  const { _id } = context;

  // Query current logged in user
  try {
    const curUser = await User.findOne({ _id }).exec();
    console.log('curUser', curUser);
    return curUser;
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = user;
