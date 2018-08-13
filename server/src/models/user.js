const mongoose = require('mongoose');
const { isEmail } = require('validator');
const Joi = require('joi');

// Constants
const MIN_STRING_LENGTH = 2;
const MAX_STRING_LENGTH = 255;
const MAX_LONG_STRING_LENGTH = 1024;

// Mongoose schema and model
const schema = mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  name: {
    type: String,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_STRING_LENGTH,
    required: [true, 'Name is required'],
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
  password: {
    type: String,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_LONG_STRING_LENGTH,
    required: [true, 'Password is required'],
  },
  phone: {
    type: String,
    minlength: MIN_STRING_LENGTH,
    maxlength: MAX_STRING_LENGTH,
  },
});

const User = mongoose.model('User', schema);

// Joi schema validator
const nameVal = Joi.string().alphanum().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const emailVal = Joi.string().email().min(MIN_STRING_LENGTH).max(MAX_STRING_LENGTH).required(); // eslint-disable-line
const passwordVal = Joi.string().min(MIN_STRING_LENGTH).max(MAX_LONG_STRING_LENGTH).required(); // eslint-disable-line

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

module.exports = {
  User,
  validateNewUser,
  validateLogin,
};