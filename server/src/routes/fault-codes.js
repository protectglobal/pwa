const express = require('express');

const router = express.Router();

// FB auth
/* router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FB_WEBHOOK_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Error, wrong token');
  }
}); */

// Handle FB messages
router.post('/', (req, res) => {
  console.log('req', req);
  // Send a status 200 (success) back to FB to let them know you've successfully
  // received the callback.
  res.sendStatus(200);

  /* const data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry. There may be multiple if batched
    data.entry.forEach((pageEntry) => {
      // Iterate over each messaging event and handle accordingly
      pageEntry.messaging.forEach((messagingEvent) => {
        console.log({ messagingEvent });
        if (messagingEvent.message) {
          console.log('MESSAGE');
          receiveApi.handleReceiveMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          console.log('POSTBACK');
          // receiveApi.handleReceivePostback(messagingEvent);
        } else if (messagingEvent.referral) {
          console.log('REFERRAL');
          // receiveApi.handleReceiveReferral(messagingEvent);
        } else {
          console.log(
            'Webhook received unknown messagingEvent: ',
            messagingEvent,
          );
        }
      });
    });
  } */
});

module.exports = router;
