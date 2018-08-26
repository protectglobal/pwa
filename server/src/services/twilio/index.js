const apiTest = require('./api-test');
const send = require('./send');

const twilioAPI = {};

//------------------------------------------------------------------------------
twilioAPI.testTwilioAPI = async (cb) => {
  await apiTest(cb);
};
//------------------------------------------------------------------------------
twilioAPI.send = async (args) => {
  await send(args);
};
//------------------------------------------------------------------------------

module.exports = twilioAPI;
