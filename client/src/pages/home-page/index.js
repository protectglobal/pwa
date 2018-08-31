import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
// import pick from 'lodash/pick';
import userFragment from '../../graphql/user/fragment/user';
import postEventMutation from '../../graphql/outgoing-event/mutation/post-event';
import PanicBtn from '../../components/panic-btn';
import ArmDisarmBtn from '../../components/arm-disarm-btn';
import SettingsBtn from '../../components/settings-btn';
import ConsoleBtn from '../../components/console-btn';
import Feedback from '../../components/common/feedback';
import Alert from '../../components/common/alert';

//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const INIT_STATE = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = Object.assign({}, INIT_STATE)

  handlePostEvent = async (event) => {
    const { postEvent } = this.props;

    // TODO: store response into redux store
    // Display outgoing event on console
    // const fields = ['userId', 'cannonId', 'eventType', 'eventValue'];
    // this.setState(pick(event, fields));

    // Fire POST request to PWA and wait for response
    try {
      const res = await postEvent({ variables: { event } });
      console.log('res', res);
      // TODO: store response into redux store
      // this.setState({ httpRes: res });
    } catch (exc) {
      console.log('exc', exc);
      // TODO: store response into redux store
      // this.setState({ httpRes: exc });
    }
  }

  handleClearConsoleClick = () => {
    this.setState(Object.assign({}, INIT_STATE));
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
};

// Apollo integration
const withMutation = graphql(postEventMutation, { name: 'postEvent' });

export default withMutation(HomePage);

/*
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import pick from 'lodash/pick';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { PWABtnProps, FormProps } from '../../render-props';
import userFragment from '../../graphql/user/fragment/user';
import postEventMutation from '../../graphql/event/mutation/post-event';
import TwilioForm from '../../components/twilio-form';
import PanicBtn from '../../components/panic-btn';
import Console from '../../components/console';
import EventsList from '../../components/events-list';
import ClearEventsBtn from '../../components/clear-events-btn';
import SubscribeBtn from '../../components/pwa/subscribe-btn';
import UnsubscribeBtn from '../../components/pwa/unsubscribe-btn';
import PushBtn from '../../components/pwa/push-btn';
import Feedback from '../../components/common/feedback';
import Alert from '../../components/common/alert';
import Loading from '../../components/common/loading';

//------------------------------------------------------------------------------
// STYLE:
//------------------------------------------------------------------------------
const Half = styled.div`
  flex: 1;
`;
//------------------------------------------------------------------------------
const Spacer = styled.div`
  width: 20px;
`;
//------------------------------------------------------------------------------
const Json = styled.pre`
  word-wrap: break-word;
  white-space: pre-wrap;
`;
//------------------------------------------------------------------------------
// CONSTANTS:
//------------------------------------------------------------------------------
const INIT_STATE = {
  cannonId: '',
  eventType: '',
  eventValue: '',
  httpRes: {},
};
//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
class HomePage extends React.PureComponent {
  state = Object.assign({}, INIT_STATE)

  handleEventPost = async (event) => {
    const { postEvent } = this.props;

    // Display fault code on console
    this.setState(pick(event, ['cannonId', 'eventType', 'eventValue']));

    // Fire POST request to PWA and wait for response
    try {
      const res = await postEvent({
        variables: { event },
      });
      console.log('res', res);
      this.setState({ httpRes: res });
    } catch (exc) {
      console.log('exc', exc);
      this.setState({ httpRes: exc });
    }
  }

  handlePanicBtnClick = ({ cannonId = '1' }) => {
    const event = {
      cannonId,
      eventType: 'panicBtn',
      eventValue: 'on',
    };
    this.handleEventPost(event);
  }

  handleClearConsoleClick = () => {
    this.setState(Object.assign({}, INIT_STATE));
  }

  render() {
    const { curUser } = this.props;
    const {
      cannonId,
      eventType,
      eventValue,
      httpRes,
    } = this.state;

    return (
      <div>
        <div className="flex">
          <Half>
            <h3>Current User</h3>
            <Json>
              {JSON.stringify(curUser, null, 2)}
            </Json>
          </Half>
          <Spacer />
          <Half>
            <h3>Set User&apos;s Phone</h3>
            <TwilioForm curUser={curUser} />
          </Half>
        </div>
        <div className="mb2" />
        <PWABtnProps>
          {(pwaBtnProps) => {
            const {
              supported,
              subscribed,
              handleSubscriptionChange,
            } = pwaBtnProps;

            return (
              <FormProps>
                {(formProps) => {
                  const {
                    disabled,
                    errorMsg,
                    successMsg,
                    handleBefore,
                    handleServerError,
                    handleSuccess,
                  } = formProps;

                  // Display loading indicator while checking for push support
                  if (supported === 'loading') {
                    return <Loading />;
                  }

                  // Do not render subscribe and push notification buttons in case
                  // notifications aren't supported
                  if (!supported) {
                    return (
                      <Alert
                        type="error"
                        content="Your browser doesn't support service workers"
                      />
                    );
                  }

                  return (
                    <div>
                      {subscribed ? (
                        <UnsubscribeBtn
                          disabled={disabled}
                          onBeforeHook={handleBefore}
                          onServerErrorHook={handleServerError}
                          onSuccessHook={() => {
                            handleSubscriptionChange({ subscribed: false });
                            handleSuccess();
                          }}
                        />
                      ) : (
                        <SubscribeBtn
                          disabled={disabled}
                          onBeforeHook={handleBefore}
                          onServerErrorHook={handleServerError}
                          onSuccessHook={() => {
                            handleSubscriptionChange({ subscribed: true });
                            handleSuccess();
                          }}
                        />
                      )}
                      <div className="my1" />
                      {subscribed && (
                        <PushBtn
                          disabled={disabled}
                          onBeforeHook={handleBefore}
                          onServerErrorHook={handleServerError}
                          onSuccessHook={handleSuccess}
                        />
                      )}
                      <div className="my1" />
                      <Feedback
                        className="mb2"
                        loading={disabled}
                        errorMsg={errorMsg}
                        successMsg={successMsg}
                      />
                      <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {JSON.stringify(curUser, null, 2)}
                      </pre>
                    </div>
                  );
                }}
              </FormProps>
            );
          }}
        </PWABtnProps>
        <div className="mb2" />
        <PanicBtn
          onClick={this.handlePanicBtnClick}
        />
        <div className="mb2" />
        <h3>Outcomming HTTP requests</h3>
        <Console
          cannonId={cannonId}
          eventType={eventType}
          eventValue={eventValue}
          httpRes={httpRes}
        />
        <div className="mb2" />
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClearConsoleClick}
        >
          Clear console
        </Button>
        <div className="mb2" />
        <h3>Incomming HTTP requests - <ClearEventsBtn /></h3>
        <EventsList />
        <div className="mb2" />
      </div>
    );
  }
}

HomePage.propTypes = {
  curUser: propType(userFragment),
  postEvent: PropTypes.func.isRequired,
};

HomePage.defaultProps = {
  curUser: null,
};

// Apollo integration
const withMutation = graphql(postEventMutation, { name: 'postEvent' });

export default withMutation(HomePage);

*/