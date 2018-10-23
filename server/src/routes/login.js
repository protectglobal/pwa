const express = require('express');
const pick = require('lodash/pick');
const { User, validLogin, PassCode } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const credentials = pick(data, ['email', 'passCode']);

  const { error } = validLogin(credentials);
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
  const isValidPassCode = record && parseInt(credentials.passCode, 10) === record.passCode;
  if (!isValidPassCode) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  // Check expirationDate
  if (record.expired()) {
    res.status(400).send('Pass code has expired'); // Bad request
    return;
  }

  // Set emailVerifield field to 'true'
  await User.update({ _id: user._id }, { $set: { emailVerified: true } }).exec();

  const token = user.genAuthToken();
  res.header('x-auth-token', token).status(200).send(pick(user, ['_id'])); // Success request
});

module.exports = router;
