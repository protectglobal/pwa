import { Subscription } from '../../../../models';
// import utils from '../../utils';

//------------------------------------------------------------------------------
/**
* @summary Save subscription into user's record.
*/
const saveSubscription = async (root, args, context) => {
  const { subscription } = args;
  const { usr } = context;

  // TODO: use middleware
  // Users.utils.checkLoggedInAndVerified(userId);

  const subs = new Subscription({
    userId: usr._id,
    ...subscription,
  });

  try {
    await subs.save();
    return { status: 200 };
  } catch (exc) {
    console.error(exc);
    return { status: 500 };
  }
};
//------------------------------------------------------------------------------

export default saveSubscription;
