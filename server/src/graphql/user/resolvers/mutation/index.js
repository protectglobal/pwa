const savePinCode = require('./save-pin-code');
const validatePinCode = require('./validate-pin-code');
const setPhone = require('./set-phone');

const Mutation = {
  validatePinCode,
  savePinCode,
  setPhone,
};

module.exports = Mutation;
