const bcrypt = require('bcrypt');
const { User, validatePinCode } = require('../../../../models');

const savePinCode = async (root, args, context) => {
  const { pinCode } = args;
  const { usr } = context;

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  if (!usr) {
    throw new Error(404, 'User not found');
  }

  const { error } = validatePinCode({ pinCode });
  if (error) {
    console.error(error);
    throw new Error(400, error.details[0].message); // Bad request
  }

  // Hash pinCode
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(pinCode, salt);

  const selector = { _id: usr._id };
  const modifier = { $set: { pinCode: hashed } };

  try {
    await User.update(selector, modifier);
    return await User.findOne(selector).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  }
};

module.exports = savePinCode;
