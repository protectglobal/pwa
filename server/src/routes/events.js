const express = require('express');
const castArray = require('lodash/castArray');
const { User, Event } = require('../models');
const twilioAPI = require('../services/twilio');

const router = express.Router();

// TODO: after receiving the event we'll need to make an HTTP request to get the
// user name/phone associted to the cannonId

// Handle events comming from Virtual Fog Cannon app
router.post('/', async (req, res) => {
  const data = req.body;
  const { cannonId, eventType, eventValue } = data;

  // Store event into events collection
  try {
    const event = new Event({
      cannonId,
      eventType,
      eventValue: eventValue && castArray(eventValue), // make sure eventValue is an array
    });
    await event.save();
    res.sendStatus(200);
  } catch (exc) {
    console.log(exc);
    res.sendStatus(500);
  }

  // TODO get user associted to cannon id
  const user = await User.findOne({}).exec();

  if (user && user.phone && user.phone.trim().length > 0) {
    twilioAPI.send({
      to: user.phone.trim(),
      body: `${eventType} - ${eventValue}`,
    });
  }
});

module.exports = router;
