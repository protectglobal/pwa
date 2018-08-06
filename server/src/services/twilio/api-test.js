const { client, twilioPhone } = require('./config');

const apiTest = async (cb) => {
  console.log('test twilio API');
  const msg = {
    body: 'Hello from Node',
    to: '+34722184802', // Text this number
    from: twilioPhone, // From a valid Twilio number
  };

  try {
    const res = await client.messages.create(msg);
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

module.exports = apiTest;
