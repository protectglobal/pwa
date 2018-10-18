const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const { JWT_PRIVATE_KEY } = process.env;

const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const PASS_CODE_LENGTH = 6;

//------------------------------------------------------------------------------
// MONGOOSE:
//------------------------------------------------------------------------------
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
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
  emailVerified: {
    type: Boolean,
    default: false,
  },
  ip: {
    type: String,
  },
  cannonId: {
    type: String, // TODO: ID
    default: '1', // TODO: get this value by comparing user and cannon IP's
  },
  phone: {
    type: String,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_STRING_LENGTH,
  },
});

schema.methods.genAuthToken = function () {
  return jwt.sign({ _id: this._id }, JWT_PRIVATE_KEY);
};

const User = mongoose.model('User', schema);

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const ipVal = Joi.string().ip(); // eslint-disable-line
const passCodeVal = Joi.string().length(PASS_CODE_LENGTH).required(); // eslint-disable-line

const validateNewUser = (user) => {
  const joiSchema = {
    email: emailVal,
    ip: ipVal,
  };

  return Joi.validate(user, joiSchema); // { error, value }
};

const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    passCode: passCodeVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
};

module.exports = {
  User,
  validateNewUser,
  validateLogin,
};

/*
password: {
  type: String,
  minlength: MIN_STRING_LENGTH,
  maxlength: MAX_LONG_STRING_LENGTH,
  required: [true, 'Password is required'],
},
name: {
  type: String,
  minlength: MIN_STRING_LENGTH,
  maxlength: MAX_STRING_LENGTH,
  required: [true, 'Name is required'],
},

const nameVal = Joi.string().alphanum().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
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
};

const validateLogin = (credentials) => {
  const joiSchema = {
    email: emailVal,
    password: passwordVal,
  };

  return Joi.validate(credentials, joiSchema); // { error, value }
};
*/
