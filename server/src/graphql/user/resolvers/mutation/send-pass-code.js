const { User } = require('../../../../models');

const sendPassCode = async (root, args) => {
  const { email } = args;

  // Is there any user associated to this email?
  const userExists = !!(await User.findOne({ email }));

  // If no, create a new user record before sending the pass code
  if (!userExists) {
    try {
      const user = new User({ email });
      await user.save();
    } catch (exc) {
      console.log(exc);
      return { status: 500 };
    }
  }

  // TODO: genearte passCode and store it in DB

  // TODO: send passCode to user

  return { status: 200 };
};

module.exports = sendPassCode;
