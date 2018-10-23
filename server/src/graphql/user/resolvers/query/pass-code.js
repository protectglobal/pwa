// const { PassCode } = require('../../../../models');

// Send pass code to front-end for testing purposes
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
