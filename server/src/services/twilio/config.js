const Twilio = require('twilio');

/**
 * @see {@link https://www.twilio.com/console}
 * @see {@link https://www.twilio.com/console/sms/getting-started/build}
 * @see {@link https://www.twilio.com/docs/libraries/node}
 * @see {@link https://www.twilio.com/docs/sms/quickstart/node}
 */

const {
  TWILIO_ACCOUNT_SID, // your Account SID from www.twilio.com/console
  TWILIO_AUTH_TOKEN, // your Auth Token from www.twilio.com/console
  TWILIO_PHONE,
} = process.env;

const client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

module.exports = {
  client,
  twilioPhone: TWILIO_PHONE,
};
