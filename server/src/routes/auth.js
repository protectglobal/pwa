/* const express = require('express');
const pick = require('lodash/pick');
const bcrypt = require('bcrypt');
const { User, validateLogin } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const credentials = pick(data, ['email', 'password']);

  const { error } = validateLogin(credentials);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user exists
  const user = await User.findOne({ email: credentials.email });
  if (!user) {
    res.status(400).send('Invalid email or password'); // Bad request
    return;
  }

  // Check password (bcrypt gets the salt included in user.password and use it to
  // hash credentials.password)
  const isValidPassword = await bcrypt.compare(credentials.password, user.password);
  if (!isValidPassword) {
    res.status(400).send('Invalid email or password'); // Bad request
    return;
  }

  const token = user.genAuthToken();

  res.status(200).send(token); // Success request
});

module.exports = router; */
