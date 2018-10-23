const sendPassCode = require('./send-pass-code');
const savePinCode = require('./save-pin-code');
const validatePinCode = require('./validate-pin-code');
const setPhone = require('./set-phone');

const Mutation = {
  sendPassCode,
  validatePinCode,
  savePinCode,
  setPhone,
};

module.exports = Mutation;
