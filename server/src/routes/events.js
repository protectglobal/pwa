const express = require('express');
const castArray = require('lodash/castArray');
const pick = require('lodash/pick');
const { User, Subscription, Event } = require('../models');
const twilioAPI = require('../services/twilio');
const pushAPI = require('../services/push');
const asyncForEach = require('../utils/async-for-each');

const router = express.Router();

//------------------------------------------------------------------------------
// ENDPOINT:
//------------------------------------------------------------------------------
/**
 * @summary Handle events comming from Virtual Fog Cannon app
 // TODO: after receiving the event we'll need to make an HTTP request to get the
 // user name/phone associted to the cannonId
 */
router.post('/', async (req, res) => {
  const data = req.body;
  const { cannonId, eventType, eventValue } = data;

  // Store event into events collection
  const event = new Event({
    cannonId,
    eventType,
    eventValue: eventValue && castArray(eventValue), // make sure eventValue is an array
  });
  await event.save();
  res.sendStatus(200);

  // TODO get user associted to cannon id
  const user = await User.findOne({}).exec();

  // Get subscriptions associated to user
  const subscriptions = await Subscription.find({}).select({ endpoint: 1, keys: 1 }).exec();

  // Send the messages
  asyncForEach(subscriptions, async (subscription) => {
    const response = await pushAPI.send({
      subscription: pick(subscription, ['endpoint', 'keys']),
      title: 'Incoming event',
      body: `${eventType} - ${eventValue}`,
      // icon,
    });

    if (response && response.error) {
      // This is probably an old subscription, remove it
      await Subscription.deleteOne({ userId: user._id, endpoint: subscription.endpoint });
    }
  });

  if (user && user.phone && user.phone.trim().length > 0) {
    await twilioAPI.send({
      to: user.phone.trim(),
      body: `${eventType} - ${eventValue}`,
    });
  }
});

module.exports = router;
