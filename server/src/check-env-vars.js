/**
 * @summary Makes sure all env vars are set
 */
const {
  MONGO_URL,
  JWT_PRIVATE_KEY,
  VFC_URL,
  SMTP_HOST,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  SMTP_PORT,
  GCM_PRIVATE_KEY,
  VAPID_SUBJECT,
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY,
  TWILIO_ACCOUNT_SID, // your Account SID from www.twilio.com/console
  TWILIO_AUTH_TOKEN, // your Auth Token from www.twilio.com/console
  TWILIO_PHONE,
} = process.env;

if (!MONGO_URL || MONGO_URL.trim().length === 0) {
  console.error('FATAL ERROR: MONGO_URL env var missing');
  process.exit(1);
}

if (!JWT_PRIVATE_KEY || JWT_PRIVATE_KEY.trim().length === 0) {
  console.error('FATAL ERROR: JWT_PRIVATE_KEY env var missing');
  process.exit(1);
}

if (!VFC_URL || VFC_URL.trim().length === 0) {
  console.error('FATAL ERROR: VFC_URL env var missing');
  process.exit(1);
}

if (
  !SMTP_HOST || SMTP_HOST.trim().length === 0
  || !SMTP_USERNAME || SMTP_USERNAME.trim().length === 0
  || !SMTP_PASSWORD || SMTP_PASSWORD.trim().length === 0
  || !SMTP_PORT || SMTP_PORT.trim().length === 0
) {
  console.error('FATAL ERROR: SMTP env vars missing');
  process.exit(1);
}

if (!GCM_PRIVATE_KEY || GCM_PRIVATE_KEY.trim().length === 0) {
  console.error('FATAL ERROR: GCM_PRIVATE_KEY env var missing');
  process.exit(1);
}

if (
  !VAPID_SUBJECT || VAPID_SUBJECT.trim().length === 0
  || !VAPID_PUBLIC_KEY || VAPID_PUBLIC_KEY.trim().length === 0
  || !VAPID_PRIVATE_KEY || VAPID_PRIVATE_KEY.trim().length === 0
) {
  console.error('FATAL ERROR: VAPID envs var missing');
  process.exit(1);
}

if (
  !TWILIO_ACCOUNT_SID || TWILIO_ACCOUNT_SID.length === 0
  || !TWILIO_AUTH_TOKEN || TWILIO_AUTH_TOKEN.length === 0
  || !TWILIO_PHONE || TWILIO_PHONE.length === 0
) {
  console.error('FATAL ERROR: TWILIO env vars missing');
  process.exit(1);
}
