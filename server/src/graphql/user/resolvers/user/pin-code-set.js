const pinCodeSet = async ({ pinCode }) => (
  (pinCode && pinCode.trim().length > 0) || false
);

module.exports = pinCodeSet;
