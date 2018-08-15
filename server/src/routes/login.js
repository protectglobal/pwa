const express = require('express');
const pick = require('lodash/pick');
const bcrypt = require('bcrypt');
const { User, validateLogin } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  console.log('req', Object.keys(req));
  console.log('req.query', req.query);
  console.log('req.body', req.body);
  const credentials = pick(data, ['email', 'passCode']);
  console.log('credentials', credentials);

  const { error } = validateLogin(credentials);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user exists
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  // Check passCode (bcrypt gets the salt included in user.passCode and use it to
  // hash credentials.passCode)
  // const isValidPassCode = await bcrypt.compare(credentials.passCode, user.passCode);
  const isValidPassCode = credentials.passCode === '123456';
  if (!isValidPassCode) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  const token = user.genAuthToken();
  console.log('token', token);

  res.header('x-auth-token', token).status(200).send(pick(user, ['_id', 'email'])); // Success request
});

module.exports = router;
