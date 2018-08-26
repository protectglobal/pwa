const Joi = require('joi');
const { client, twilioPhone } = require('./config');

//------------------------------------------------------------------------------
// JOI:
//------------------------------------------------------------------------------
const validateArgs = (args) => {
  const joiSchema = {
    to: Joi.string().required(),
    body: Joi.string().required(),
  };

  return Joi.validate(args, joiSchema); // { error, value }
};

//------------------------------------------------------------------------------
// METHOD:
//------------------------------------------------------------------------------
const send = async (args) => {
  const { error } = validateArgs(args);
  if (error) {
    return { error: error.details[0].message };
  }

  const { to, body } = args;

  console.log(
    '\n******Send SMS******',
    '\nto', to,
    '\nbody', body,
  );

  const payload = {
    body,
    to, // Text this number
    from: twilioPhone, // From a valid Twilio number
  };

  try {
    await client.messages.create(payload);
    console.log('\nSMS DELIVERED SUCCESSFULLY!');
    return { error: null };
  } catch (exc) {
    console.log(`\nError when trying to deliver SMS for ${to}`, exc);
    return { error: exc };
  }
};

module.exports = send;

/*
const { client, twilioPhone } = require('./config');

const send = async ({ to, body }, cb) => {
  console.log(
    '\n******Send SMS******',
    '\nto', to,
    '\nbody', body,
  );

  const msg = {
    body,
    to, // Text this number
    from: twilioPhone, // From a valid Twilio number
  };

  try {
    const res = client.messages.create(msg);
    console.log(res);
    if (cb && typeof cb === 'function') {
      cb({ err: null, res });
    }
  } catch (exc) {
    console.log(exc);
    if (cb && typeof cb === 'function') {
      cb({ err: exc });
    }
  }
};

module.exports = send;
*/