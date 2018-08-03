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

export default send;
