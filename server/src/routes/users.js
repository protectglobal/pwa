const express = require('express');
const pick = require('lodash/pick');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, validateNewUser } = require('../models');

const router = express.Router();

const { JWT_PRIVATE_KEY } = process.env;

if (!JWT_PRIVATE_KEY || JWT_PRIVATE_KEY.length === 0) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY env var missing');
  process.exit(1);
}

router.post('/', async (req, res) => {
  const data = req.body;
  const newUser = pick(data, ['name', 'email', 'password']);

  const { error } = validateNewUser(newUser);
  if (error) {
    console.log(error);
    res.status(400).send(error.details[0].message); // Bad request
    return;
  }

  // Make sure user does not exist already
  const userExists = !!(await User.findOne({ email: newUser.email }));
  if (userExists) {
    res.status(400).send('User already registered'); // Bad request
    return;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(newUser.password, salt);
  newUser.password = hashed;

  // Store new user into users collection
  try {
    const user = new User(newUser);
    await user.save();
    const token = jwt.sign({ _id: user._id }, JWT_PRIVATE_KEY);
    res.header('x-auth-token', token).status(200).send(pick(user, ['_id', 'name', 'email'])); // Success request
  } catch (exc) {
    console.log(exc);
    res.status(500).send((exc && exc.errmsg) || exc); // Internal server error
  }
});

module.exports = router;
