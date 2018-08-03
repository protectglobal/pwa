const apiTest = require('./api-test');
const send = require('./send');

const TwilioAPI = {};

//------------------------------------------------------------------------------
TwilioAPI.testTwilioAPI = (cb) => {
  apiTest(cb);
};
//------------------------------------------------------------------------------
TwilioAPI.send = (args) => {
  send(args);
};
//------------------------------------------------------------------------------

module.exports = TwilioAPI;
