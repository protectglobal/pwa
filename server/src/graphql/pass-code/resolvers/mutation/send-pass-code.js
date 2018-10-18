const { nodemailer, transporter } = require('../../../../services/nodemailer/config');
const {
  User,
  validateNewUser,
  PassCode,
  genPassCode,
} = require('../../../../models');

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getText = ({ passCode }) => (`
Hello,

Your verification code is ${passCode}.

Thanks.
`);
//------------------------------------------------------------------------------
// MUTATION:
//------------------------------------------------------------------------------
const sendPassCode = async (root, args, context) => {
  const { email } = args;
  const { usr } = context;
  console.log('sendPassCode context.usr', usr);

  // Is there any user associated to this email?
  const user = !!(await User.findOne({ email }));

  if (!user) {
    // return { status: 500 };
    throw new Error('User not found');
  }

  // Genearte a 6-digit pass code and store it into DB
  const passCode = genPassCode(6);

  // Check if pass code record exists. If no, add it. Otherwise, edit it.
  try {
    const record = await PassCode.findOne({ email });
    if (!record) {
      const newRecord = new PassCode({ email, passCode });
      await newRecord.save();
    } else {
      record.passCode = passCode;
      await record.save();
    }
  } catch (exc) {
    console.error(exc);
  }

  /*
  try {
    await PassCode.findOneAndUpdate(
      { email },
      { $set: { passCode, expirationDate: new Date() } },
      { upsert: true, new: true },
    );
  } catch (exc) {
    console.error(exc);
  }
  */

  // Send pass code to user
  const mailOptions = {
    from: 'email@example.com', // sender address
    to: email, // list of receivers
    subject: `Your pass code is ${passCode} for <siteName>`, // Subject line
    text: getText({ passCode }), // plain text body
    // html: '<b>Hello world?</b>', // html body
  };

  // Send mail with defined transport object
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return { status: 200 };
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (exc) {
    console.error('ERROR DELIVERYING EMAIL', exc);
    return { status: 500 };
  }
};

module.exports = sendPassCode;
