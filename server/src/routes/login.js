const express = require('express');
const pick = require('lodash/pick');
const { User, validateLogin, PassCode } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log('data', data);
  const credentials = pick(data, ['email', 'passCode']);

  const { error } = validateLogin(credentials);
  if (error) {
    console.error(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user exists
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  // Check passCode
  const record = await PassCode.findOne({ email: credentials.email }).exec();
  console.log('record', record);
  console.log('credentials.passCode', credentials.passCode);
  console.log('typeof credentials.passCode', typeof credentials.passCode);
  const isValidPassCode = record && parseInt(credentials.passCode, 10) === record.passCode;
  console.log('isValidPassCode', isValidPassCode.toString());
  if (!isValidPassCode) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  const token = user.genAuthToken();
  console.log('token', token);

  res.header('x-auth-token', token).status(200).send(pick(user, ['_id', 'email'])); // Success request
});

module.exports = router;
