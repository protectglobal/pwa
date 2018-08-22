const { PassCode } = require('../../../../models');

const passCode = async (root, args, context) => {
  const { email } = args;
  const { usr } = context;

  return 111111;

  /* if (!usr || !usr._id) {
    return null;
  }

  try {
    return await PassCode.findOne({ email }).exec();
  } catch (exc) {
    console.log(exc);
    return null;
  } */
};

module.exports = passCode;
