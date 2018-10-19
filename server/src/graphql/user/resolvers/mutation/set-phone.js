const { User } = require('../../../../models');

// TODO: get user from context
const setPhone = async (root, args) => {
  const { phone } = args;

  // Query (current) user
  const user = await User.findOne({}).exec();

  if (!user) {
    throw new Error(404, 'User not found');
  }

  const selector = { _id: user._id };
  const modifier = { $set: { phone } };

  try {
    await User.update(selector, modifier);
    return await User.findOne(selector).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = setPhone;
