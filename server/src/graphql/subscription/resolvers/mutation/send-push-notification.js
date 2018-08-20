import webPush from 'web-push';
import { Subscription } from '../../../../models';
// import utils from '../../utils';
import deleteSubscription from './delete-subscription';

const {
  GCM_PRIVATE_KEY,
  VAPID_SUBJECT,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
} = process.env;

if (!GCM_PRIVATE_KEY || GCM_PRIVATE_KEY.length === 0) {
  console.error('FATAL ERROR: GCM_PRIVATE_KEY env var missing');
  process.exit(1);
}

if (
  !VAPID_SUBJECT || VAPID_SUBJECT.length === 0
  || !VAPID_PUBLIC_KEY || VAPID_PUBLIC_KEY.length === 0
  || !VAPID_PRIVATE_KEY || VAPID_PRIVATE_KEY.length === 0
) {
  console.error('FATAL ERROR: VAPID_PRIVATE_KEY envs var missing');
  process.exit(1);
}

// const { privateKey: gcmPrivateKey } = Meteor.settings.firebase;
// const { publicKey: vapidPublicKey } = Meteor.settings.public.vapid;
// const { subject: vapidSubject, privateKey: vapidPrivateKey } = Meteor.settings.vapid;

//------------------------------------------------------------------------------
/**
* @summary Send push notification to all subscribed users.
*/
const sendPushNotification = async (root, args, context) => {
  const { usr } = context;

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  // Set web-push keys
  webPush.setGCMAPIKey(GCM_PRIVATE_KEY);
  webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

  const payload = JSON.stringify({
    title: 'Welcome',
    body: 'Thank you for enabling push notifications',
    icon: '/android-chrome-192x192.png',
  });

  const options = {
    TTL: 60, // time to live in seconds
  };

  // Gather all subscriptions from all subscribed users
  // const selector = { subscriptions: { $exists: true, $ne: [] } };
  // const projection = { fields: { _id: true, subscriptions: true } };
  let subscriptions = [];
  try {
    subscriptions = await Subscription.find({}).exec();
  } catch (exc) {
    return { status: 500 };
  }

  // Actually send the messages
  // TODO: use promise.all and then return { status: 200 }
  subscriptions.forEach((subscription) => {
    webPush.sendNotification(subscription, payload, options)
      .then(() => {})
      .catch((err) => {
        console.log(`Error when trying to deliver message for ${subscription.endpoint}`, err);
        // This is probably an old subscription, remove it
        deleteSubscription(null, { endpoint: subscription.endpoint }, { userId: usr._id });
      });
  });

  return { status: 200 };
};
//------------------------------------------------------------------------------

export default sendPushNotification;
