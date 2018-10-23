const express = require('express');
const pick = require('lodash/pick');
const { User, validNewUser } = require('../models');

const router = express.Router();

router.post('/', async (req, res) => {
  const data = req.body;
  const newUser = pick(data, ['email']);

  const { error } = validNewUser(newUser);
  if (error) {
    console.error(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user doesn't exist already
  const userExists = !!(await User.findOne({ email: newUser.email }));
  if (userExists) {
    res.status(400).send('Email registered already'); // Bad request
    return;
  }

  try {
    const user = new User(newUser);
    await user.save();
    res.status(200).send(pick(user, ['_id'])); // Success request
  } catch (exc) {
    console.log(exc);
    res.status(500); // Bad request
  }
});

module.exports = router;
