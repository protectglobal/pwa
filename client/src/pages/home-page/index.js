import React from 'react';
import PropTypes from 'prop-types';
import { graphql, compose } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import { connect } from 'react-redux';
// import pick from 'lodash/pick';
import userFragment from '../../graphql/user/fragment/user';
import postEventMutation from '../../graphql/outgoing-event/mutation/post-event';
import Actions from '../../redux/actions';
import PanicBtn from '../../components/panic-btn';
import ArmDisarmBtn from '../../components/arm-disarm-btn';
import SettingsBtn from '../../components/settings-btn';
import ConsoleBtn from '../../components/console-btn';
// import Feedback from '../../components/common/feedback';
import Alert from '../../components/common/alert';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  handlePostEvent = async (event) => {
    const {
      postEvent,
      setCannonId,
      setEventType,
      setEventValue,
      setHttpRes,
    } = this.props;

    const { cannonId, eventType, eventValue } = event;

    // Save event into redux store
    setCannonId(cannonId);
    setEventType(eventType);
    setEventValue(eventValue);

    // Fire POST request to PWA and wait for response
    try {
      const res = await postEvent({ variables: { event } });
      console.log('res', res);
      // Save response into redux store
      setHttpRes(res.data.postEvent);
    } catch (exc) {
      console.log('exc', exc);
      // Save response into redux store
      setHttpRes(exc);
    }
  }

  render() {
    const { curUser } = this.props;

    // TODO: use FormProps to disable btns
    return (
      <React.Fragment>
        {!curUser.cannonId && (
          <Alert
            type="error"
            content="We couldn't find any Fog Cannon in your net.
            Please, make sure your are connected to the same net as your cannon."
          />
        )}
        <div className="flex flex-wrap justify-around p2">
          <PanicBtn
            curUser={curUser}
            onClick={this.handlePostEvent}
          />
          <ArmDisarmBtn
            curUser={curUser}
            onClick={this.handlePostEvent}
          />
          <SettingsBtn
            curUser={curUser}
          />
          <ConsoleBtn />
        </div>
      </React.Fragment>
    );
  }
}

HomePage.propTypes = {
  curUser: propType(userFragment).isRequired,
  postEvent: PropTypes.func.isRequired,
  setCannonId: PropTypes.func.isRequired,
  setEventType: PropTypes.func.isRequired,
  setEventValue: PropTypes.func.isRequired,
  setHttpRes: PropTypes.func.isRequired,
};

//------------------------------------------------------------------------------
// REDUX INTEGRATION:
//------------------------------------------------------------------------------
const namespace = 'outgoingEvents';

const mapStateToProps = state => ({ ...state[namespace] });

const mapDispatchToProps = dispatch => ({
  setCannonId: value => (
    dispatch(Actions.updateTextField(namespace, 'cannonId', value))
  ),
  setEventType: value => (
    dispatch(Actions.updateTextField(namespace, 'eventType', value))
  ),
  setEventValue: value => (
    dispatch(Actions.updateTextField(namespace, 'eventValue', value))
  ),
  setHttpRes: value => (
    dispatch(Actions.setObjectField(namespace, 'httpRes', value))
  ),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

//------------------------------------------------------------------------------
// APOLLO INTEGRATION:
//------------------------------------------------------------------------------
const withMutation = graphql(postEventMutation, { name: 'postEvent' });

//------------------------------------------------------------------------------

const enhance = compose(
  withRedux,
  withMutation,
);

export default enhance(HomePage);
