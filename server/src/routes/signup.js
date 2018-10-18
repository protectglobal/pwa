const express = require('express');
const pick = require('lodash/pick');
const { User, validateNewUser } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  console.log('signup.req', req.body);
  const data = req.body;
  const newUser = pick(data, ['email']);
  console.log('newUser', newUser);

  const { error } = validateNewUser(newUser);
  if (error) {
    console.error(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user doesn't exist already
  const userExists = !!(await User.findOne({ email: newUser.email }));
  console.log('User exists', newUser.email);
  if (userExists) {
    res.status(400).send('Email registered already'); // Bad request
    return;
  }

  try {
    const user = new User(newUser);
    await user.save();
    console.log('user', user);
    res.status(200).send(pick(user, ['_id'])); // Success request
  } catch (exc) {
    console.log(exc);
    res.status(500); // Bad request
  }

  /* const { error } = validateLogin(credentials);
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
  } */

  // Check passCode
  /* const record = await PassCode.findOne({ email: credentials.email }).exec();
  const isValidPassCode = record && parseInt(credentials.passCode, 10) === record.passCode;
  if (!isValidPassCode) {
    res.status(400).send('Invalid email or passcode'); // Bad request
    return;
  }

  const token = user.genAuthToken();
  res.header('x-auth-token', token).status(200).send(pick(user, ['_id'])); // Success request */
});

module.exports = router;
