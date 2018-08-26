const webPush = require('web-push');

/**
 * @see {@link https://developers.google.com/web/fundamentals/push-notifications/sending-messages-with-web-push-libraries}
 * @see {@link https://www.npmjs.com/package/web-push}
 */

const {
  GCM_PRIVATE_KEY,
  VAPID_SUBJECT,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
} = process.env;

console.log('process.env', process.env);

if (!GCM_PRIVATE_KEY || GCM_PRIVATE_KEY.length === 0) {
  console.error('FATAL ERROR: GCM_PRIVATE_KEY env var missing');
  process.exit(1);
}

if (
  !VAPID_SUBJECT || VAPID_SUBJECT.length === 0
  || !VAPID_PUBLIC_KEY || VAPID_PUBLIC_KEY.length === 0
  || !VAPID_PRIVATE_KEY || VAPID_PRIVATE_KEY.length === 0
) {
  console.error('FATAL ERROR: VAPID envs var missing');
  process.exit(1);
}

// Set web-push keys
webPush.setGCMAPIKey(GCM_PRIVATE_KEY);
webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY);

module.exports = webPush;
