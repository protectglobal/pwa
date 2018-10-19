const bcrypt = require('bcrypt');
const { User, validatePinCode: valPinCode } = require('../../../../models');

const validatePinCode = async (root, args, context) => {
  const { pinCode } = args;
  const { usr } = context;
  console.log('validatePinCode', pinCode, usr);

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  // Make sure user exists
  const user = await User.findOne({ _id: usr._id });
  if (!user) {
    throw new Error('User not found');
  }

  const { error } = valPinCode({ pinCode });
  if (error) {
    console.error(error.details[0].message);
    throw new Error(error.details[0].message); // Bad request
  }

  // Validate pin code (bcrypt gets the salt included in user.pinCode
  // and use it to hash args.pinCode)
  const isValidPinCode = await bcrypt.compare(pinCode, user.pinCode);
  if (!isValidPinCode) {
    throw new Error('Invalid pin code'); // Bad request
  }

  return user;
};

module.exports = validatePinCode;
