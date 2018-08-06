const apiTest = require('./api-test');
const send = require('./send');

const twilioAPI = {};

//------------------------------------------------------------------------------
twilioAPI.testTwilioAPI = (cb) => {
  apiTest(cb);
};
//------------------------------------------------------------------------------
twilioAPI.send = (args) => {
  send(args);
};
//------------------------------------------------------------------------------

module.exports = twilioAPI;
