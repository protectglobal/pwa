const request = require('request-promise-native');

const { VFC_URL } = process.env;

if (!VFC_URL || VFC_URL.trim().length === 0) {
  throw new Error(404, 'missing VFC_URL');
}

const postEvent = async (root, args) => {
  const { event } = args;
  console.log('event', event);

  const options = {
    method: 'POST',
    uri: VFC_URL,
    body: event,
    json: true, // Automatically stringifies the body to JSON
  };

  try {
    const res = await request(options); // parsedBody
    console.log('res', res);
    return { status: 200 };
  } catch (exc) {
    console.log(exc);
    return { status: 500 };
  }
};

module.exports = postEvent;
