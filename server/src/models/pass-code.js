const mongoose = require('mongoose');
const { isEmail } = require('validator');
const moment = require('moment');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const PASS_CODE_LENGTH = 6;
//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getExpDate = () => (
  // Five minutes from now
  moment().add(5, 'minutes').toISOString()
  // moment().add(5, 'seconds').toISOString()
);
//------------------------------------------------------------------------------
// MONGOOSE:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_STRING_LENGTH,
    unique: true,
    required: [true, 'Email address is required'],
    validate: [isEmail, 'Please fill a valid email address'],
  },
  passCode: {
    type: Number,
    minlength: PASS_CODE_LENGTH,
    maxlength: PASS_CODE_LENGTH,
    required: [true, 'Pass code is required'],
  },
  expirationDate: {
    type: Date,
    default: getExpDate(),
  },
});

// Define a pre-save method for categorySchema
schema.pre('save', function (next) {
  this.expirationDate = getExpDate();
  next();
});

schema.methods.expired = function () {
  const now = moment();
  console.log('NOW', now.clone().toISOString());
  const expDate = moment(this.expirationDate);
  console.log('EXP_DATE', expDate.clone().toISOString());
  console.log('DIFF', expDate.diff(now));
  return expDate.diff(now) < 0;
};

const PassCode = mongoose.model('PassCode', schema);

// TODO: Math.random() does not provide cryptographically secure random numbers.
// Do not use them for anything related to security. Use the Web Crypto API
// instead, and more precisely the window.crypto.getRandomValues() method.
const genPassCode = digits => (
  Math.floor(Math.random() * (10 ** digits))
);

module.exports = {
  PassCode,
  genPassCode,
};
