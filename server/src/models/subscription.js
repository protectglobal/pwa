const mongoose = require('mongoose');
/* const { isEmail } = require('validator');
const Joi = require('joi');
const jwt = require('jsonwebtoken'); */

/* const { JWT_PRIVATE_KEY } = process.env;

if (!JWT_PRIVATE_KEY || JWT_PRIVATE_KEY.length === 0) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY env var missing');
  process.exit(1);
} */

// Constants
/* const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const MAX_LONG_STRING_LENGTH = 1024;
const PASS_CODE_LENGTH = 6; */

// Mongoose schema and model
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'User id is required'],
    index: true,
  },
  endpoint: {
    type: String,
  },
  keys: {
    auth: {
      type: String,
    },
    p256dh: {
      type: String,
    },
  },
});

/* schema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
}; */

const Subscription = mongoose.model('Subscription', schema);

// Joi schema validator
/* const nameVal = Joi.string().alphanum().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const passwordVal = Joi.string().min(MIN_STRING_LENGTH).max(MAX_LONG_STRING_LENGTH).required(); // eslint-disable-line
const passCodeVal = Joi.string().length(PASS_CODE_LENGTH).required(); // eslint-disable-line

const validateNewUser = (user) => {
  const joiSchema = {
    name: nameVal,
    email: emailVal,
    password: passwordVal,
    // access_token: [Joi.string(), Joi.number()],
  };

  return Joi.validate(user, joiSchema); // { error, value }
}; */

/* const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    password: passwordVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
}; */

/* const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    passCode: passCodeVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
}; */

module.exports = Subscription;
